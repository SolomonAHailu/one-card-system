package registrarcontrollers

import (
	"fmt"
	"log"
	"math"
	"net/http"
	"strconv"
	"time"

	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
	"github.com/SolomonAHailu/one-card-system/models/registrarmodels"
	"github.com/SolomonAHailu/one-card-system/utils"
	"github.com/gin-gonic/gin"
	digest "github.com/xinsnake/go-http-digest-auth-client"
	"gorm.io/gorm"
)

// SyncDataFromSMS fetches student data from an external SMS service and synchronizes it with the database.
func SyncDataFromSMS(c *gin.Context, db *gorm.DB) {
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

	for _, student := range students {
		var existingStudent registrarmodels.Student
		if result := db.Where("student_id = ?", student.StudentID).First(&existingStudent); result.Error != nil {
			if result.Error != gorm.ErrRecordNotFound {
				utils.ResponseWithError(c, http.StatusInternalServerError, "Failed to check existing student record")
				continue
			}

			// Create new student record
			if err := db.Create(&student).Error; err != nil {
				utils.ResponseWithError(c, http.StatusInternalServerError, "Error inserting new student")
				log.Println("Error inserting new student:", err)
				return
			}
		} else {
			// Update existing record if needed
			if shouldUpdateStudent(existingStudent, student) {
				if err := db.Model(&existingStudent).Updates(student).Error; err != nil {
					utils.ResponseWithError(c, http.StatusInternalServerError, "Error updating existing student")
					log.Println("Error updating existing student:", err)
					return
				}
			}
		}

		// Send the student data to all devices
		for _, device := range devices {
			err := sendStudentToDevice(device, student)
			if err != nil {
				log.Printf("Error sending student to device %s: %v\n", device.Name, err)
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

// GetStudents retrieves a list of students from the database and sends it as a JSON response.
func GetStudents(c *gin.Context, db *gorm.DB) {
	var students []registrarmodels.Student
	var total int64

	// Query parameters
	page := c.DefaultQuery("page", "1")
	limit := c.DefaultQuery("limit", "10")
	name := c.Query("name") // Optional 'name' query parameter

	// Parse and validate pagination parameters
	pageInt, err := strconv.Atoi(page)
	if err != nil || pageInt < 1 {
		pageInt = 1
	}
	limitInt, err := strconv.Atoi(limit)
	if err != nil || limitInt < 1 {
		limitInt = 10
	}

	// Start building the query
	query := db.Model(&registrarmodels.Student{})

	// Apply name filter if provided
	if name != "" {
		query = query.Where("LOWER(first_name) LIKE LOWER(?) OR LOWER(father_name) LIKE LOWER(?) OR LOWER(grand_father_name) LIKE LOWER(?)", "%"+name+"%", "%"+name+"%", "%"+name+"%")
	}

	// Get total count for pagination
	if err := query.Count(&total).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching students count"})
		return
	}

	// Fetch paginated data with Preloads
	if err := query.Preload("LibraryAssigned").
		Preload("CafeteriaAssigned").
		Preload("DormitoryAssigned").
		Preload("RegisteredBy").
		Limit(limitInt).
		Offset((pageInt - 1) * limitInt).
		Find(&students).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching students"})
		return
	}

	// Calculate total pages
	totalPages := int64(math.Ceil(float64(total) / float64(limitInt)))

	// Respond with paginated data
	c.JSON(http.StatusOK, gin.H{
		"data":          students,
		"currentPage":   pageInt,
		"totalPages":    totalPages,
		"totalStudents": total,
	})
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
			StudentID:       "ST12345",
			FirstName:       "Yosef",
			FatherName:      "Alemu",
			GrandFatherName: "Doe Sr. Sr.",
			Email:           "john1@example.com",
			Phone:           "123456789",
			Sex:             registrarmodels.SexMale,
			DateOfBirth:     parseDate("2000-05-15"),
			Program:         "Computer Science",
			Section:         "A",
			Year:            3,
			Semester:        1,
			Religion:        "Muslim",
			RegisteredDate:  parseDate("2023-08-10"),
			Status:          registrarmodels.StatusInactive,
		},
		{
			StudentID:       "ST12346",
			FirstName:       "Yosef",
			FatherName:      "Alemu",
			GrandFatherName: "Doe Sr. Sr.",
			Email:           "john2@example.com",
			Phone:           "123456789",
			Sex:             registrarmodels.SexMale,
			DateOfBirth:     parseDate("2000-05-15"),
			Program:         "Computer Science",
			Section:         "A",
			Year:            3,
			Semester:        1,
			Religion:        "Muslim",
			RegisteredDate:  parseDate("2023-08-10"),
			Status:          registrarmodels.StatusInactive,
		},
		{
			StudentID:       "ST12340",
			FirstName:       "Yosef",
			FatherName:      "Alemu",
			GrandFatherName: "Doe Sr. Sr.",
			Email:           "john3@example.com",
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
	}, nil
}

func sendStudentToDevice(device adminmodels.Devices, student registrarmodels.Student) error {
	username := "admin"
	password := "CON123456"

	apiURL := fmt.Sprintf(
		"http://%s/cgi-bin/recordUpdater.cgi?action=insert&name=AccessControlCard&CardName=%s&CardNo=%s&UserID=%d&CardStatus=0&CardType=0&Password=123456&Doors[0]=1&Doors[1]=3&Doors[2]=5&ValidDateStart=%s&ValidDateEnd=%s",
		device.IPAddress,
		student.FirstName+" "+student.FatherName+" "+student.GrandFatherName,
		student.StudentID,
		student.ID,
		time.Now().Format("20060102 150405"),
		time.Now().AddDate(1, 0, 0).Format("20060102 150405"),
	)

	// Create a Digest Authentication client
	client := digest.NewRequest(username, password, "GET", apiURL, "")

	// Perform the request
	resp, err := client.Execute()
	if err != nil {
		return fmt.Errorf("failed to send request: %w", err)
	}
	defer resp.Body.Close()

	// Check response status
	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("device API returned status: %d", resp.StatusCode)
	}

	return nil
}
