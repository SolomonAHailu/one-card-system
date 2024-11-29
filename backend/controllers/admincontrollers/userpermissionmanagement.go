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

// CreateUserPermission creates new permissions for a user based on an array of PermissionIds,
// and returns the created permissions with related user and permission data.
func CreateUserPermission(c *gin.Context, db *gorm.DB) {
	var req UserPermissionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Invalid request payload", err)
		return
	}

	// Start a transaction
	tx := db.Begin()
	if tx.Error != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error starting transaction", tx.Error)
		return
	}

	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			utils.ResponseWithError(c, http.StatusInternalServerError, "An unexpected error occurred", nil)
		}
	}()

	var user adminmodels.Users
	if err := tx.First(&user, req.UserId).Error; err != nil {
		tx.Rollback()
		if err == gorm.ErrRecordNotFound {
			utils.ResponseWithError(c, http.StatusNotFound, "User not found", err)
		} else {
			utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
		}
		return
	}

	for _, permissionId := range req.PermissionIds {
		var rolePermission adminmodels.RolePermissions
		if err := tx.Where("role_id = ? AND permission_id = ?", user.RoleId, permissionId).First(&rolePermission).Error; err != nil {
			tx.Rollback()
			if err == gorm.ErrRecordNotFound {
				utils.ResponseWithError(c, http.StatusNotFound, "Permission not found for this user's role", err)
			} else {
				utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
			}
			return
		}

		var existingPermission adminmodels.UserPermissions
		if err := tx.Where("user_id = ? AND permission_id = ?", req.UserId, permissionId).First(&existingPermission).Error; err == nil {
			continue
		} else if err != gorm.ErrRecordNotFound {
			tx.Rollback()
			utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
			return
		}

		userPermission := adminmodels.UserPermissions{
			UserId:       int(req.UserId),
			PermissionId: int(permissionId),
		}
		if err := tx.Create(&userPermission).Error; err != nil {
			tx.Rollback()
			utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
			return
		}
	}

	if err := tx.Commit().Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error committing transaction", err)
		return
	}

	var updatedPermissions []adminmodels.UserPermissions
	if err := db.Preload("User").
		Preload("User.Role").
		Preload("Permission").
		Where("user_id = ?", req.UserId).
		Find(&updatedPermissions).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching updated user permissions", err)
		return
	}

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

	// Start a transaction
	tx := db.Begin()
	if tx.Error != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error starting transaction", tx.Error)
		return
	}

	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			utils.ResponseWithError(c, http.StatusInternalServerError, "An unexpected error occurred", nil)
		}
	}()

	// Fetch existing permissions
	var existingPermissions []adminmodels.UserPermissions
	if err := tx.Where("user_id = ?", req.UserId).Find(&existingPermissions).Error; err != nil {
		tx.Rollback()
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching existing user permissions", err)
		return
	}

	// Create a map of requested permissions for comparison
	requestedPermissions := make(map[uint]bool)
	for _, permissionId := range req.PermissionIds {
		requestedPermissions[permissionId] = true
	}

	// Delete permissions not in the request
	for _, perm := range existingPermissions {
		if _, exists := requestedPermissions[uint(perm.PermissionId)]; !exists {
			if err := tx.Delete(&perm).Error; err != nil {
				tx.Rollback()
				utils.ResponseWithError(c, http.StatusInternalServerError, "Error deleting user permission", err)
				return
			}
		}
	}

	// Add new permissions
	for _, permissionId := range req.PermissionIds {
		var existingPermission adminmodels.UserPermissions
		if err := tx.Where("user_id = ? AND permission_id = ?", req.UserId, permissionId).First(&existingPermission).Error; err == gorm.ErrRecordNotFound {
			newPermission := adminmodels.UserPermissions{
				UserId:       int(req.UserId),
				PermissionId: int(permissionId),
			}
			if err := tx.Create(&newPermission).Error; err != nil {
				tx.Rollback()
				utils.ResponseWithError(c, http.StatusInternalServerError, "Error adding new user permission", err)
				return
			}
		} else if err != nil {
			tx.Rollback()
			utils.ResponseWithError(c, http.StatusInternalServerError, "Error checking existing permission", err)
			return
		}
	}

	// Commit the transaction
	if err := tx.Commit().Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error committing transaction", err)
		return
	}

	// Fetch updated permissions
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
