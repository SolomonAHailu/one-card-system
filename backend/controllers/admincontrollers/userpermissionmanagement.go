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
// CreateUserPermission creates new permissions for a user based on an array of PermissionIds,
// and returns the created permissions with related user and permission data.
func CreateUserPermission(c *gin.Context, db *gorm.DB) {
	var req UserPermissionRequest
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

	// Iterate over each PermissionId to handle creation
	for _, permissionId := range req.PermissionIds {
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
			// Permission already exists; skip to the next
			continue
		} else if err != gorm.ErrRecordNotFound {
			utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
			return
		}

		// If permission doesn't exist, create the user permission
		userPermission := adminmodels.UserPermissions{
			UserId:       int(req.UserId),
			PermissionId: int(permissionId),
		}
		if err := db.Create(&userPermission).Error; err != nil {
			utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
			return
		}
	}

	// Fetch the updated user permissions with related user and permission data
	var updatedPermissions []adminmodels.UserPermissions
	if err := db.
		Preload("User").
		Preload("User.Role").
		Preload("Permission").
		Where("user_id = ?", req.UserId).
		Find(&updatedPermissions).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching updated user permissions", err)
		return
	}

	// Return the created permissions with preloaded data
	c.JSON(http.StatusCreated, gin.H{
		"data": updatedPermissions,
	})
}

// get permission specific to the user
func GetUserPermission(c *gin.Context, db *gorm.DB) {
	userId := c.Param("id")
	var userPermission []adminmodels.UserPermissions
	if err := db.
		Preload("User").
		Preload("User.Role").
		Preload("Permission").
		Where("user_id = ?", userId).
		Find(&userPermission).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching user permissions", err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": userPermission})
}

// handleUserPermissionUpdate updates the permissions for a user by deleting any permissions
// not in the request and adding any new ones, then returns the updated permissions with related user and permission data.
func HandleUserPermissionUpdate(c *gin.Context, db *gorm.DB) {
	var req UserPermissionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Invalid request payload", err)
		return
	}

	// Retrieve the user's existing permissions
	var existingPermissions []adminmodels.UserPermissions
	if err := db.Where("user_id = ?", req.UserId).Find(&existingPermissions).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching existing user permissions", err)
		return
	}

	// Create a map of requested permissions for easy lookup
	requestedPermissions := make(map[uint]bool)
	for _, permissionId := range req.PermissionIds {
		requestedPermissions[permissionId] = true
	}

	// Iterate through existing permissions and delete those not in the request
	for _, perm := range existingPermissions {
		if _, exists := requestedPermissions[uint(perm.PermissionId)]; !exists {
			// Delete the permission if it does not exist in the new request
			if err := db.Delete(&perm).Error; err != nil {
				utils.ResponseWithError(c, http.StatusInternalServerError, "Error deleting user permission", err)
				return
			}
		}
	}

	// Add new permissions that are in the request but not in the existing permissions
	for _, permissionId := range req.PermissionIds {
		var existingPermission adminmodels.UserPermissions
		if err := db.Where("user_id = ? AND permission_id = ?", req.UserId, permissionId).First(&existingPermission).Error; err == gorm.ErrRecordNotFound {
			// Permission does not exist, so create it
			userPermission := adminmodels.UserPermissions{
				UserId:       int(req.UserId),
				PermissionId: int(permissionId),
			}
			if err := db.Create(&userPermission).Error; err != nil {
				utils.ResponseWithError(c, http.StatusInternalServerError, "Error adding new user permission", err)
				return
			}
		} else if err != nil {
			utils.ResponseWithError(c, http.StatusInternalServerError, "Error checking existing permission", err)
			return
		}
	}
	// Fetch the updated user permissions with related user and permission data
	var updatedPermissions []adminmodels.UserPermissions
	if err := db.
		Preload("User").
		Preload("User.Role").
		Preload("Permission").
		Where("user_id = ?", req.UserId).
		Find(&updatedPermissions).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching updated user permissions", err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": updatedPermissions,
	})
}
