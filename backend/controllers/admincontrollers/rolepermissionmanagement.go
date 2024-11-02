package admincontrollers

import (
	"net/http"

	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
	"github.com/SolomonAHailu/one-card-system/utils"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// create permissions for the specified roles
func CreateRolePermission(c *gin.Context, db *gorm.DB) {
	var rolePermission adminmodels.RolePermissions
	if err := c.ShouldBindJSON(&rolePermission); err != nil {
		utils.ResponseWithError(c, http.StatusCreated, "Invalid request payload", err)
		return
	}
	var existingRolePermission adminmodels.RolePermissions
	if err := db.Where("role_id = ? AND permission_id = ?", rolePermission.RoleId, rolePermission.PermissionId).
		First(&existingRolePermission).Error; err == nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "RolePermission already exists", err)
		return
	}
	if err := db.Create(&rolePermission).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "RolePermission not created", err)
		return
	}
	if err := db.Preload("Role").Preload("Permission").
		First(&rolePermission, rolePermission.ID).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "RolePermission not found", err)
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": rolePermission})
}

// get all role permissions
func GetRolePermissions(c *gin.Context, db *gorm.DB) {
	var rolePermissions []adminmodels.RolePermissions
	if err := db.Preload("Role").Preload("Permission").Find(&rolePermissions).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "RolePermissions not found", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rolePermissions})
}

// get role permission by role id
func GetRolePermissionByRoleId(c *gin.Context, db *gorm.DB) {
	var rolePermissions []adminmodels.RolePermissions
	if err := db.Preload("Role").Preload("Permission").
		Where("role_id = ?", c.Param("id")).Find(&rolePermissions).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "RolePermissions not found", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rolePermissions})
}

// delete role permission by id
func DeleteRolePermissionById(c *gin.Context, db *gorm.DB) {
	var rolePermission adminmodels.RolePermissions
	if err := db.Preload("Role").Preload("Permission").
		First(&rolePermission, c.Param("id")).Error; err != nil {
		utils.ResponseWithError(c, http.StatusNotFound, "RolePermission not found", err)
		return
	}

	if err := db.Delete(&rolePermission).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "RolePermission not deleted", err)
		return
	}

	c.JSON(200, gin.H{"data": rolePermission})
}

// update role permissions by role id
// UpdateRolePermissions updates the permissions for a specific role
func UpdateRolePermissions(c *gin.Context, db *gorm.DB) {
	// Define request payload
	type UpdateRolePermissionsPayload struct {
		RoleID        uint   `json:"role_id" binding:"required"`
		PermissionIDs []uint `json:"permission_ids" binding:"required"`
	}

	var payload UpdateRolePermissionsPayload
	if err := c.ShouldBindJSON(&payload); err != nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Invalid request payload", err)
		return
	}

	// Start a transaction
	tx := db.Begin()
	if tx.Error != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Failed to begin transaction", tx.Error)
		return
	}

	// Case 1: If permission_ids is empty, remove all permissions for this role
	if len(payload.PermissionIDs) == 0 {
		if err := tx.Where("role_id = ?", payload.RoleID).
			Delete(&adminmodels.RolePermissions{}).Error; err != nil {
			tx.Rollback()
			utils.ResponseWithError(c, http.StatusInternalServerError, "Failed to remove all permissions", err)
			return
		}
		// Commit and return early since there are no permissions to add
		if err := tx.Commit().Error; err != nil {
			utils.ResponseWithError(c, http.StatusInternalServerError, "Failed to commit transaction", err)
			return
		}
		c.JSON(http.StatusOK, gin.H{"data": []adminmodels.RolePermissions{}})
		return
	}

	// Case 2: Remove permissions not in the new list
	if err := tx.Where("role_id = ? AND permission_id NOT IN ?", payload.RoleID, payload.PermissionIDs).
		Delete(&adminmodels.RolePermissions{}).Error; err != nil {
		tx.Rollback()
		utils.ResponseWithError(c, http.StatusInternalServerError, "Failed to remove outdated permissions", err)
		return
	}

	// Fetch existing permissions for the role to prevent re-creation of existing relationships
	var existingPermissions []adminmodels.RolePermissions
	if err := tx.Where("role_id = ?", payload.RoleID).Find(&existingPermissions).Error; err != nil {
		tx.Rollback()
		utils.ResponseWithError(c, http.StatusInternalServerError, "Failed to fetch current permissions", err)
		return
	}

	// Map existing permissions for quick lookup
	existingPermissionIDs := make(map[uint]bool)
	for _, rp := range existingPermissions {
		existingPermissionIDs[uint(rp.PermissionId)] = true
	}

	// Prepare the list of truly new permissions to add
	var permissionsToAdd []adminmodels.RolePermissions
	for _, permissionID := range payload.PermissionIDs {
		if !existingPermissionIDs[permissionID] {
			permissionsToAdd = append(permissionsToAdd, adminmodels.RolePermissions{
				RoleId:       int(payload.RoleID),
				PermissionId: int(permissionID),
			})
		}
	}

	// Add new permissions if there are any
	if len(permissionsToAdd) > 0 {
		if err := tx.Create(&permissionsToAdd).Error; err != nil {
			tx.Rollback()
			utils.ResponseWithError(c, http.StatusInternalServerError, "Failed to add new permissions", err)
			return
		}
	}

	// Commit the transaction
	if err := tx.Commit().Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Failed to commit transaction", err)
		return
	}

	// Fetch updated permissions for the role to return in response
	var updatedPermissions []adminmodels.RolePermissions
	if err := db.Preload("Role").Preload("Permission").
		Where("role_id = ?", payload.RoleID).Find(&updatedPermissions).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Failed to fetch updated permissions", err)
		return
	}

	// Return updated permissions as response
	c.JSON(http.StatusOK, gin.H{"data": updatedPermissions})
}
