package admincontrollers

import (
	"net/http"

	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
	"github.com/SolomonAHailu/one-card-system/utils"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// CreateUserPermission creates a new user permission
func CreateUserPermission(c *gin.Context, db *gorm.DB) {
	var userPermission adminmodels.UserPermissions

	// Bind JSON to userPermission
	if err := c.ShouldBindJSON(&userPermission); err != nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Invalid request payload", err)
		return
	}

	// Retrieve the user based on userId
	var user adminmodels.Users
	if err := db.First(&user, userPermission.UserId).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			utils.ResponseWithError(c, http.StatusNotFound, "User not found", err)
		} else {
			utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
		}
		return
	}

	// Check if the permission exists for the role in RolePermission table
	var rolePermission adminmodels.RolePermissions
	if err := db.Where("role_id = ? AND permission_id = ?", user.RoleId, userPermission.PermissionId).First(&rolePermission).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			utils.ResponseWithError(c, http.StatusNotFound, "Permission not found for this user's role", err)
		} else {
			utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
		}
		return
	}

	// Check for existing user permission
	var existingPermission adminmodels.UserPermissions
	if err := db.Where("user_id = ? AND permission_id = ?", userPermission.UserId, userPermission.PermissionId).First(&existingPermission).Error; err == nil {
		// If a record exists, return an error
		utils.ResponseWithError(c, http.StatusConflict, "User permission already exists", nil)
		return
	}

	// If permission don't exists, proceed to create the user permission
	if err := db.Create(&userPermission).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
		return
	}

	// Return a success message after creating the user permission
	c.JSON(http.StatusCreated, gin.H{"message": "User permission created successfully"})
}
