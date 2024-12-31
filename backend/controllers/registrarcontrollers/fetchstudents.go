package registrarcontrollers

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"

	dac "github.com/Snawoot/go-http-digest-auth-client"
	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
	"github.com/SolomonAHailu/one-card-system/models/registrarmodels"
	"github.com/SolomonAHailu/one-card-system/utils"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// SyncDataFromSMS fetches student data from an external SMS service and synchronizes it with the database.
func SyncDataFromSMS(c *gin.Context, db *gorm.DB) {
	username := os.Getenv("DEVICE_USERNAME")
	password := os.Getenv("DEVICE_PASSWORD")

	// Fetch student data from SMS service
	students, err := fetchStudentDataFromSMS()
	if err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Failed to fetch students from SMS", err)
		return
	}

	// Fetch all devices
	var devices []adminmodels.Devices
	if err := db.Find(&devices).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching devices", err)
		return
	}

	// Verify device statuses concurrently
	var wg sync.WaitGroup
	deviceErrors := make(chan error, len(devices))
	for _, device := range devices {
		wg.Add(1)
		go func(device adminmodels.Devices) {
			defer wg.Done()
			client := &http.Client{
				Transport: dac.NewDigestTransport(username, password, http.DefaultTransport),
			}
			apiURL := fmt.Sprintf("http://%s/cgi-bin/AccessUser.cgi?action=fetch", device.IPAddress)
			_, err := client.Get(apiURL)
			if err != nil {
				deviceErrors <- fmt.Errorf("device %s is offline: %v", device.IPAddress, err)
			}
		}(device)
	}
	wg.Wait()
	close(deviceErrors)

	// Handle device errors
	for err := range deviceErrors {
		log.Println(err)
		utils.ResponseWithError(c, http.StatusInternalServerError, "Device status check failed", err)
		return
	}
	fmt.Println("All devices are online")

	// Synchronize student data
	for _, student := range students {
		var existingStudent registrarmodels.Student
		result := db.Where("student_id = ?", student.StudentID).First(&existingStudent)

		if result.Error != nil {
			if result.Error == gorm.ErrRecordNotFound {
				// New student, validate and insert
				if err := student.Validate(db); err != nil {
					log.Printf("Validation error for student %s: %v", student.StudentID, err)
					continue
				}
				if err := db.Create(&student).Error; err != nil {
					log.Printf("Failed to insert new student %s: %v", student.StudentID, err)
					continue
				}
				sendStudentToDevicesConcurrently(devices, student)
			} else {
				log.Printf("Failed to fetch student %s: %v", student.StudentID, result.Error)
				continue
			}
		} else {
			// Existing student, check for updates
			if shouldUpdateStudent(existingStudent, student) {
				if err := student.ValidateForUpdate(db, existingStudent.ID); err != nil {
					log.Printf("Validation error for student %s: %v", student.StudentID, err)
					continue
				}
				if err := db.Model(&existingStudent).Updates(student).Error; err != nil {
					log.Printf("Failed to update student %s: %v", student.StudentID, err)
					continue
				}
				sendStudentToDevicesConcurrently(devices, student)
			}
		}
	}
	log.Println("Data synchronization completed successfully")
}
