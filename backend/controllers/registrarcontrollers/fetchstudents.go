package registrarcontrollers

import (
	"log"
	"net/http"
	"time"

	"github.com/SolomonAHailu/one-card-system/models/registrarmodels"
	"github.com/SolomonAHailu/one-card-system/utils"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// SyncDataFromSMS fetches student data from an external SMS service and synchronizes it with the database.
func SyncDataFromSMS(c *gin.Context, db *gorm.DB) {
	students, err := fetchStudentDataFromSMS()
	if err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Failed to fetch students from SMS")
		return
	}

	for _, student := range students {
		var existingStudent registrarmodels.Student
		if result := db.Where("student_id = ?", student.StudentID).First(&existingStudent); result.Error != nil {
			if result.Error != gorm.ErrRecordNotFound {
				utils.ResponseWithError(c, http.StatusInternalServerError, "Failed to check existing student record")
				continue
			}
			// If student is not found, create a new record
			if err := db.Create(&student).Error; err != nil {
				utils.ResponseWithError(c, http.StatusInternalServerError, "Error inserting new student")
				log.Println("Error inserting new student:", err)
				return
			}
		} else {
			// Update only if there are changes in the incoming data
			if shouldUpdateStudent(existingStudent, student) {
				if err := db.Model(&existingStudent).Updates(student).Error; err != nil {
					utils.ResponseWithError(c, http.StatusInternalServerError, "Error updating existing student")
					log.Println("Error updating existing student:", err)
					return

				}
			}
		}
	}
}

// shouldUpdateStudent compares two Student records and returns true if there are any differences.
func shouldUpdateStudent(existing, new registrarmodels.Student) bool {
	return existing.CardNumber != new.CardNumber ||
		existing.FirstName != new.FirstName ||
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
	if err := db.Find(&students).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch students"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": students})

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
			CardNumber:      "1234567890",
			FirstName:       "Yosef",
			FatherName:      "Alemu",
			GrandFatherName: "Doe Sr. Sr.",
			Email:           "john@example.com",
			Phone:           "123456789",
			Sex:             registrarmodels.SexMale,
			DateOfBirth:     parseDate("2000-05-15"),
			Program:         "Computer Science",
			Section:         "A",
			Year:            3,
			Semester:        1,
			Religion:        "Christianity",
			Photo:           "john_photo.png",
			RegisteredBy:    "Admin",
			RegisteredDate:  parseDate("2023-08-10"),
			Status:          registrarmodels.StatusActive,
		},
		{
			StudentID:       "ST67890",
			CardNumber:      "0987654321",
			FirstName:       "Jane",
			FatherName:      "Smith",
			GrandFatherName: "Smith Sr.",
			Email:           "jane@example.com",
			Phone:           "987654321",
			Sex:             registrarmodels.SexFemale,
			DateOfBirth:     parseDate("2001-07-20"),
			Program:         "Electrical Engineering",
			Section:         "B",
			Year:            2,
			Semester:        2,
			Religion:        "Islam",
			Photo:           "jane_photo.png",
			RegisteredBy:    "Admin",
			RegisteredDate:  parseDate("2023-08-11"),
			Status:          registrarmodels.StatusActive,
		},
	}, nil
}
