package controllers

import (
	"log"
	"net/http"

	"github.com/SolomonAHailu/one-card-system/backend/models/registrarmodels"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// SyncDataFromSMS fetches student data from an external SMS service and synchronizes it with the database.
func SyncDataFromSMS(db *gorm.DB) {
	students, err := fetchStudentDataFromSMS()
	if err != nil {
		log.Println("Error fetching data from SMS:", err)
		return
	}

	for _, student := range students {
		var existingStudent registrarmodels.Student
		if result := db.First(&existingStudent, student.ID); result.Error != nil {
			if result.Error != gorm.ErrRecordNotFound {
				log.Println("Error checking existing student:", result.Error)
				continue
			}
			// If student is not found, create a new record
			if err := db.Create(&student).Error; err != nil {
				log.Println("Error inserting new student:", err)
			}
		} else {
			// Update the existing student record
			if err := db.Model(&existingStudent).Updates(student).Error; err != nil {
				log.Println("Error updating existing student:", err)
			}
		}
	}
}

// GetStudents retrieves a list of students from the database and sends it as a JSON response.
func GetStudents(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var students []registrarmodels.Student
		if err := db.Find(&students).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch students"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"data": students})
	}
}

// fetchStudentDataFromSMS is a placeholder function that simulates data retrieval from an SMS service.
func fetchStudentDataFromSMS() ([]registrarmodels.Student, error) {
	return []registrarmodels.Student{
		{
			FirstName:       "John",
			StudentId:       "ST12345",
			FatherName:      "Doe Sr.",
			GrandFatherName: "Doe Sr. Sr.",
			Email:           "john@example.com",
			Phone:           "123456789",
			Program:         "Computer Science",
			Section:         "A",
			Year:            "3",
			Semester:        "1",
			Religion:        "Christianity",
			Photo:           "john_photo.png",
			PhotoUrl:        "https://example.com/photos/john.png",
			CaferiaToUse:    "Main Cafeteria",
			LibraryToUse:    "Central Library",
			RegisteredBy:    "Admin",
			RegisteredDate:  "2023-08-10",
			Status:          "Active",
		},
		{
			FirstName:       "Jane",
			StudentId:       "ST67890",
			FatherName:      "Smith",
			GrandFatherName: "Smith Sr.",
			Email:           "jane@example.com",
			Phone:           "987654321",
			Program:         "Electrical Engineering",
			Section:         "B",
			Year:            "2",
			Semester:        "2",
			Religion:        "Islam",
			Photo:           "jane_photo.png",
			PhotoUrl:        "https://example.com/photos/jane.png",
			CaferiaToUse:    "East Cafeteria",
			LibraryToUse:    "Engineering Library",
			RegisteredBy:    "Admin",
			RegisteredDate:  "2023-08-11",
			Status:          "Active",
		},
	}, nil
}
