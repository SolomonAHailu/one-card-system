package admincontrollers

import (
	"net/http"

	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
	"github.com/SolomonAHailu/one-card-system/utils"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// Create permission for the user
func CreatePermission(c *gin.Context, db *gorm.DB) {
	var permission adminmodels.Permissions
	if err := c.ShouldBindJSON(&permission); err != nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Invalid request payload", err)
		return
	}
	if err := permission.ValidatePermission(db); err != nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Invalid request payload", err)
		return
	}
	if err := db.Create(&permission).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "Permission successfully created", "data": permission})
}

// Get all permissions
func GetPermissions(c *gin.Context, db *gorm.DB) {
	var permissions []adminmodels.Permissions
	if err := db.Order("updated_at DESC").Find(&permissions).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "Permissions successfully fetched", "data": permissions})
}

// Get permission by id
func GetPermission(c *gin.Context, db *gorm.DB) {
	var permission adminmodels.Permissions
	if err := db.First(&permission, c.Param("id")).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Permission successfully fetched", "data": permission})
}

// Update permission by id
func UpdatePermission(c *gin.Context, db *gorm.DB) {
	var permission adminmodels.Permissions

	// Fetch the permission by ID
	if err := db.First(&permission, c.Param("id")).Error; err != nil {
		utils.ResponseWithError(c, http.StatusNotFound, "Permission not found", err)
		return
	}

	// Parse the incoming request payload into a temporary variable
	var updatedPermission adminmodels.Permissions
	if err := c.ShouldBindJSON(&updatedPermission); err != nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Invalid request payload", err)
		return
	}

	// Validate the updated permission data
	if err := updatedPermission.ValidatePermissionForUpdate(db, permission.ID); err != nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Validation error", err)
		return
	}

	// Use GORM's Updates method to update the permission
	if err := db.Model(&permission).Updates(updatedPermission).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
		return
	}

	// Respond with the updated permission data
	c.JSON(http.StatusOK, gin.H{"message": "Permission successfully updated", "data": permission})
}

// Delete permission by id
func DeletePermission(c *gin.Context, db *gorm.DB) {
	var permission adminmodels.Permissions
	if err := db.First(&permission, c.Param("id")).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
		return
	}
	if err := db.Delete(&permission).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Permission successfully deleted", "data": permission})
}
