package registrarcontrollers

import (
	"math"
	"net/http"
	"strconv"

	"github.com/SolomonAHailu/one-card-system/models/registrarmodels"
	"github.com/SolomonAHailu/one-card-system/utils"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

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
