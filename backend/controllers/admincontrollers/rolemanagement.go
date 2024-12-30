package admincontrollers

import (
	"net/http"

	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
	"github.com/SolomonAHailu/one-card-system/utils"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// create role for the user
func CreateRole(c *gin.Context, db *gorm.DB) {
	var role adminmodels.Roles
	if err := c.ShouldBindJSON(&role); err != nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Invalid request payload", err)
		return
	}
	var existingRole adminmodels.Roles
	if err := db.Where("role_name = ?", role.RoleName).First(&existingRole).Error; err == nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Role already exists", nil)
		return
	}
	if err := db.Create(&role).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": role})
}

// get all roles
func GetRoles(c *gin.Context, db *gorm.DB) {
	var roles []adminmodels.Roles
	if err := db.Find(&roles).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": roles})
}

// get role by id
func GetRole(c *gin.Context, db *gorm.DB) {
	var role adminmodels.Roles
	if err := db.First(&role, c.Param("id")).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": role})
}

// update role by id
func UpdateRole(c *gin.Context, db *gorm.DB) {
	var role adminmodels.Roles

	// Fetch the role by ID
	if err := db.First(&role, c.Param("id")).Error; err != nil {
		utils.ResponseWithError(c, http.StatusNotFound, "Role not found", err)
		return
	}

	// Parse the incoming request payload into a temporary variable
	var updatedRole adminmodels.Roles
	if err := c.ShouldBindJSON(&updatedRole); err != nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Invalid request payload", err)
		return
	}

	// Check if the new RoleName already exists in the database for another record
	var existingRole adminmodels.Roles
	if err := db.Where("role_name = ? AND id != ?", updatedRole.RoleName, role.ID).First(&existingRole).Error; err == nil {
		utils.ResponseWithError(c, http.StatusConflict, "Role name already exists", nil)
		return
	}

	// Update the role fields
	role.RoleName = updatedRole.RoleName
	role.Description = updatedRole.Description

	// Save the updated role
	if err := db.Save(&role).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": role})
}

// delete role by id
func DeleteRole(c *gin.Context, db *gorm.DB) {
	var role adminmodels.Roles
	if err := db.First(&role, c.Param("id")).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occured", err)
		return
	}
	if err := db.Delete(&role).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occured", err)
		return
	}
	c.JSON(200, gin.H{"data": role})
}
