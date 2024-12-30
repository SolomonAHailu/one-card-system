// DONOT EDIT ANYTHING IN THIS FILE
// DONOT EDIT ANYTHING IN THIS FILE
// DONOT EDIT ANYTHING IN THIS FILE
// DONOT EDIT ANYTHING IN THIS FILE
// DONOT EDIT ANYTHING IN THIS FILE
// DONOT EDIT ANYTHING IN THIS FILE
// DONOT EDIT ANYTHING IN THIS FILE

package registrarcontrollers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

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
	students, err := fetchStudentDataFromSMS()
	if err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Failed to fetch students from SMS")
		return
	}

	// Fetch all devices
	var devices []adminmodels.Devices
	if err := db.Find(&devices).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching devices", err)
		return
	}

	// Check the status of the device
	for _, device := range devices {
		client := &http.Client{
			Transport: dac.NewDigestTransport(username, password, http.DefaultTransport),
		}
		apiURL := fmt.Sprintf("http://%s/cgi-bin/AccessUser.cgi?action=fetch", device.IPAddress)
		_, err := client.Get(apiURL)
		if err != nil {
			// utils.ResponseWithError(c, http.StatusInternalServerError, "Failed to check device status", err)
			log.Printf("Failed to check device status: %v\n", err)
			return
		}
		fmt.Println("Device with ", device.IPAddress, " is online")
	}
	fmt.Println("All devices are online")

	for _, student := range students {
		var existingStudent registrarmodels.Student

		// Check if the student already exists
		result := db.Where("student_id = ?", student.StudentID).First(&existingStudent)

		if result.Error != nil {
			if result.Error == gorm.ErrRecordNotFound {
				// Create a new student record if not found
				if err := db.Create(&student).Error; err != nil {
					utils.ResponseWithError(c, http.StatusInternalServerError, "Error inserting new student")
					log.Println("Error inserting new student:", err)
					continue
				}

				// Send the new student data to all devices
				for _, device := range devices {
					sendStudentToDevice(device, student)
				}
			} else {
				utils.ResponseWithError(c, http.StatusInternalServerError, "Failed to check existing student record")
				log.Println("Error checking student record:", result.Error)
				continue
			}
		} else {
			// Student exists, check for updates
			if shouldUpdateStudent(existingStudent, student) {
				if err := db.Model(&existingStudent).Updates(student).Error; err != nil {
					utils.ResponseWithError(c, http.StatusInternalServerError, "Error updating existing student")
					log.Println("Error updating existing student:", err)
					continue
				}
				for _, device := range devices {
					sendStudentToDevice(device, existingStudent)
				}
			}
		}
	}
}

// shouldUpdateStudent compares two Student records and returns true if there are any differences.
func shouldUpdateStudent(existing, new registrarmodels.Student) bool {
	return existing.FirstName != new.FirstName ||
		existing.FatherName != new.FatherName ||
		existing.GrandFatherName != new.GrandFatherName ||
		existing.Email != new.Email ||
		existing.Phone != new.Phone ||
		existing.Sex != new.Sex ||
		!existing.DateOfBirth.Equal(new.DateOfBirth) ||
		existing.Program != new.Program ||
		existing.Section != new.Section ||
		existing.Year != new.Year ||
		existing.Semester != new.Semester ||
		existing.Religion != new.Religion ||
		existing.Status != new.Status
}

func sendStudentToDevice(device adminmodels.Devices, student registrarmodels.Student) {
	username := os.Getenv("DEVICE_USERNAME")
	password := os.Getenv("DEVICE_PASSWORD")
	client := &http.Client{
		Transport: dac.NewDigestTransport(username, password, http.DefaultTransport),
	}
	apiURL := fmt.Sprintf("http://%s/cgi-bin/AccessUser.cgi?action=insertMulti", device.IPAddress)
	log.Println("Sending student data to device:", student.Status, student.FirstName, student.FatherName, student.GrandFatherName)
	userData := map[string]interface{}{
		"UserID":   fmt.Sprintf("%d", student.ID),
		"UserName": fmt.Sprintf("%s %s %s", student.FirstName, student.FatherName, student.GrandFatherName),
		"UserType": func() int {
			if student.Status == registrarmodels.StatusActive {
				return 0
			}
			return 1
		}(),
		"UseTime":      1,
		"IsFirstEnter": true,
		"UserStatus":   0,
		"Authority":    2,
	}
	payload := map[string]interface{}{
		"UserList": []map[string]interface{}{userData},
	}

	jsonData, err := json.Marshal(payload)
	if err != nil {
		log.Printf("failed to marshal JSON payload: %v", err)
		return
	}

	resp, err := client.Post(apiURL, "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		log.Printf("failed to send request: %v", err)
		return
	}
	defer resp.Body.Close()
}

// parseDate parses a date string and returns a time.Time object.
func parseDate(dateStr string) time.Time {
	const layout = "2006-01-02"
	parsedDate, _ := time.Parse(layout, dateStr)
	return parsedDate
}

// fetchStudentDataFromSMS is a placeholder function that simulates data retrieval from an SMS service.
func fetchStudentDataFromSMS() ([]registrarmodels.Student, error) {
	return []registrarmodels.Student{
		{
			StudentID:       "ST1",
			FirstName:       "Yosi",
			FatherName:      "Alex",
			GrandFatherName: "Menge",
			Email:           "yosef007@example.com",
			Phone:           "0982010318",
			Sex:             registrarmodels.SexMale,
			DateOfBirth:     parseDate("2000-05-15"),
			Program:         "Electrical Engineering",
			Section:         "C",
			Year:            5,
			Semester:        2,
			Religion:        "Muslim",
			RegisteredDate:  parseDate("2019-08-10"),
			Status:          registrarmodels.StatusActive,
		},
		{
			StudentID:       "ST2",
			FirstName:       "Sol",
			FatherName:      "Asregdom",
			GrandFatherName: "Hailu",
			Email:           "solomon@example.com",
			Phone:           "123456789",
			Sex:             registrarmodels.SexMale,
			DateOfBirth:     parseDate("2000-05-15"),
			Program:         "Computer Science",
			Section:         "A",
			Year:            3,
			Semester:        1,
			Religion:        "Muslim",
			RegisteredDate:  parseDate("2023-08-10"),
			Status:          registrarmodels.StatusActive,
		},
		{
			StudentID:       "ST3",
			FirstName:       "Muluken",
			FatherName:      "Hailu",
			GrandFatherName: "Abate",
			Email:           "muluken@example.com",
			Phone:           "123456789",
			Sex:             registrarmodels.SexMale,
			DateOfBirth:     parseDate("2000-05-15"),
			Program:         "Computer Science",
			Section:         "A",
			Year:            3,
			Semester:        1,
			Religion:        "Christianity",
			RegisteredDate:  parseDate("2023-08-10"),
			Status:          registrarmodels.StatusActive,
		},
		{
			StudentID:       "ST4",
			FirstName:       "Misgan",
			FatherName:      "Moges",
			GrandFatherName: "Dereje",
			Email:           "misgan@example.com",
			Phone:           "123456789",
			Sex:             registrarmodels.SexMale,
			DateOfBirth:     parseDate("2000-05-15"),
			Program:         "Computer Science",
			Section:         "A",
			Year:            3,
			Semester:        1,
			Religion:        "Christianity",
			RegisteredDate:  parseDate("2023-08-10"),
			Status:          registrarmodels.StatusActive,
		},
		{
			StudentID:       "ST5",
			FirstName:       "Abel",
			FatherName:      "Ayalew",
			GrandFatherName: "Kebede",
			Email:           "abel@example.com",
			Phone:           "123456789",
			Sex:             registrarmodels.SexMale,
			DateOfBirth:     parseDate("2000-05-15"),
			Program:         "Electrical",
			Section:         "A",
			Year:            3,
			Semester:        1,
			Religion:        "Christianity",
			RegisteredDate:  parseDate("2023-08-10"),
			Status:          registrarmodels.StatusActive,
		},
		{
			StudentID:       "ST6",
			FirstName:       "Samuel",
			FatherName:      "gashu",
			GrandFatherName: "Abne",
			Email:           "sami@example.com",
			Phone:           "123456890",
			Sex:             registrarmodels.SexMale,
			DateOfBirth:     parseDate("2000-05-15"),
			Program:         "Electrical",
			Section:         "A",
			Year:            3,
			Semester:        1,
			Religion:        "Christianity",
			RegisteredDate:  parseDate("2023-08-10"),
			Status:          registrarmodels.StatusActive,
		},
		{
			StudentID:       "ST7",
			FirstName:       "Minte",
			FatherName:      "Atnafu",
			GrandFatherName: "Abne",
			Email:           "minte@example.com",
			Phone:           "123456890",
			Sex:             registrarmodels.SexMale,
			DateOfBirth:     parseDate("2000-05-15"),
			Program:         "Electrical",
			Section:         "A",
			Year:            3,
			Semester:        1,
			Religion:        "Christianity",
			RegisteredDate:  parseDate("2023-08-10"),
			Status:          registrarmodels.StatusActive,
		},
		{
			StudentID:       "ST8",
			FirstName:       "Dagne",
			FatherName:      "Atnafu",
			GrandFatherName: "Abne",
			Email:           "dagne@example.com",
			Phone:           "123456890",
			Sex:             registrarmodels.SexMale,
			DateOfBirth:     parseDate("2000-05-15"),
			Program:         "Electrical",
			Section:         "A",
			Year:            3,
			Semester:        1,
			Religion:        "Christianity",
			RegisteredDate:  parseDate("2023-08-10"),
			Status:          registrarmodels.StatusActive,
		},
		{
			StudentID:       "ST9",
			FirstName:       "Yonas",
			FatherName:      "Adame",
			GrandFatherName: "Abne",
			Email:           "yonas@example.com",
			Phone:           "123456890",
			Sex:             registrarmodels.SexMale,
			DateOfBirth:     parseDate("2000-05-15"),
			Program:         "Electrical",
			Section:         "A",
			Year:            3,
			Semester:        1,
			Religion:        "Christianity",
			RegisteredDate:  parseDate("2023-08-10"),
			Status:          registrarmodels.StatusActive,
		},
		{
			StudentID:       "ST10",
			FirstName:       "Hanna",
			FatherName:      "Andarge",
			GrandFatherName: "Abne",
			Email:           "hani@example.com",
			Phone:           "123456890",
			Sex:             registrarmodels.SexMale,
			DateOfBirth:     parseDate("2000-05-15"),
			Program:         "Electrical",
			Section:         "A",
			Year:            3,
			Semester:        1,
			Religion:        "Christianity",
			RegisteredDate:  parseDate("2023-08-10"),
			Status:          registrarmodels.StatusActive,
		},
		{
			StudentID:       "ST11",
			FirstName:       "Emran",
			FatherName:      "Andarge",
			GrandFatherName: "Abne",
			Email:           "emran@example.com",
			Phone:           "123456890",
			Sex:             registrarmodels.SexMale,
			DateOfBirth:     parseDate("2000-05-15"),
			Program:         "Electrical",
			Section:         "A",
			Year:            3,
			Semester:        1,
			Religion:        "Christianity",
			RegisteredDate:  parseDate("2023-08-10"),
			Status:          registrarmodels.StatusInactive,
		},
		{
			StudentID:       "ST12",
			FirstName:       "Beti",
			FatherName:      "Sol",
			GrandFatherName: "Andarge",
			Email:           "beti@example.com",
			Phone:           "123456890",
			Sex:             registrarmodels.SexMale,
			DateOfBirth:     parseDate("2000-05-15"),
			Program:         "Electrical",
			Section:         "A",
			Year:            3,
			Semester:        1,
			Religion:        "Christianity",
			RegisteredDate:  parseDate("2023-08-10"),
			Status:          registrarmodels.StatusInactive,
		},
	}, nil
}
