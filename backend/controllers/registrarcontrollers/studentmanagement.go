package registrarcontrollers

import (
	"net/http"

	"github.com/SolomonAHailu/one-card-system/models/registrarmodels"
	"github.com/SolomonAHailu/one-card-system/utils"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// Get student by id
func GetStudentById(c *gin.Context, db *gorm.DB) {
	var student registrarmodels.Student
	if err := db.Preload("LibraryAssigned").
		Preload("CafeteriaAssigned").
		Preload("DormitoryAssigned").
		Preload("RegisteredBy").First(&student, c.Param("id")).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching student", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": student})
}

func UpdateStudentById(c *gin.Context, db *gorm.DB) {
	id := c.Param("id")

	// Find the student record by ID
	var student registrarmodels.Student
	if err := db.First(&student, "id = ?", id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Student not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		}
		return
	}

	// Parse incoming JSON data
	var updatedData struct {
		Status     string `json:"status"`
		Photo      string `json:"photo"`
		CardNumber string `json:"card_number"`
	}

	if err := c.ShouldBindJSON(&updatedData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}

	if updatedData.Status != "" {
		if updatedData.Status == string(registrarmodels.StatusActive) || updatedData.Status == string(registrarmodels.StatusInactive) {
			student.Status = registrarmodels.StatusType(updatedData.Status)
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid status value"})
			return
		}
	}
	if updatedData.Photo != "" {
		student.Photo = updatedData.Photo
	}
	if updatedData.CardNumber != "" {
		student.CardNumber = updatedData.CardNumber
	}

	// Save changes to the database
	if err := db.Save(&student).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update student"})
		return
	}

	// Send a response
	c.JSON(http.StatusOK, gin.H{
		"data": student,
	})
}
