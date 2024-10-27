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
