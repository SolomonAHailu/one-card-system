package admincontrollers

import (
	"net/http"

	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
	"github.com/SolomonAHailu/one-card-system/utils"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// Create role for the user
func CreateRole(c *gin.Context, db *gorm.DB) {
	var role adminmodels.Roles
	if err := c.ShouldBindJSON(&role); err != nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Invalid request payload", err)
		return
	}
	if err := role.ValidateRole(db); err != nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Invalid request payload", err)
		return
	}
	if err := db.Create(&role).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "Role successfully created", "data": role})
}

// Get all roles
func GetRoles(c *gin.Context, db *gorm.DB) {
	var roles []adminmodels.Roles
	if err := db.Order("updated_at DESC").Find(&roles).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Roles successfully fetched", "data": roles})
}

// Get role by id
func GetRole(c *gin.Context, db *gorm.DB) {
	var role adminmodels.Roles
	if err := db.First(&role, c.Param("id")).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Role successfully fetched", "data": role})
}

// Update role by id
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
	// Validate the updated role data
	if err := updatedRole.ValidateRoleForUpdate(db, role.ID); err != nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Validation error", err)
		return
	}
	// Use GORM's Updates method to update the role
	if err := db.Model(&role).Updates(updatedRole).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
		return
	}

	// Save the updated role
	if err := db.Save(&role).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Role successfully updated", "data": role})
}

// Delete role by id
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
	c.JSON(200, gin.H{"message": "Role successfully deleted", "data": role})
}
