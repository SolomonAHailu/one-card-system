package gatecontrollers

import (
	"net/http"

	"github.com/SolomonAHailu/one-card-system/models/registrarmodels"
	"github.com/SolomonAHailu/one-card-system/utils"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

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
