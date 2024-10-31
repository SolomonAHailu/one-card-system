package admincontrollers

import (
	"net/http"

	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
	"github.com/SolomonAHailu/one-card-system/utils"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// UserPermissionRequest represents the expected request payload with multiple permissions
type UserPermissionRequest struct {
	UserId        uint   `json:"user_id" binding:"required"`
	PermissionIds []uint `json:"permission_ids" binding:"required"`
}

// CreateUserPermission creates new permissions for a user based on an array of PermissionIds
func CreateUserPermission(c *gin.Context, db *gorm.DB) {
	var req UserPermissionRequest

	// Bind JSON to req
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Invalid request payload", err)
		return
	}

	// Retrieve the user based on UserId
	var user adminmodels.Users
	if err := db.First(&user, req.UserId).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			utils.ResponseWithError(c, http.StatusNotFound, "User not found", err)
		} else {
			utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
		}
		return
	}

	// Iterate over each PermissionId and handle creation
	for _, permissionId := range req.PermissionIds {
		// Check if the permission exists for the user's role in RolePermissions table
		var rolePermission adminmodels.RolePermissions
		if err := db.Where("role_id = ? AND permission_id = ?", user.RoleId, permissionId).First(&rolePermission).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				utils.ResponseWithError(c, http.StatusNotFound, "Permission not found for this user's role", err)
				return
			} else {
				utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
				return
			}
		}

		// Check for existing user permission
		var existingPermission adminmodels.UserPermissions
		if err := db.Where("user_id = ? AND permission_id = ?", req.UserId, permissionId).First(&existingPermission).Error; err == nil {
			// If a record exists, skip to the next permissionId
			continue
		} else if err != gorm.ErrRecordNotFound {
			// If there's an unexpected error, return it
			utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
			return
		}

		// If permission doesn't exist, proceed to create the user permission
		userPermission := adminmodels.UserPermissions{
			UserId:       int(req.UserId),
			PermissionId: int(permissionId),
		}
		if err := db.Create(&userPermission).Error; err != nil {
			utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
			return
		}
	}

	// Return a success message after creating the user permissions
	c.JSON(http.StatusCreated, gin.H{"message": "User permissions created successfully"})
}
