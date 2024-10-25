package admincontrollers

import (
	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// create permissions for the specified roles
func CreateRolePermission(c *gin.Context, db *gorm.DB) {
	var rolePermission adminmodels.RolePermissions
	if err := c.ShouldBindJSON(&rolePermission); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	var existingRolePermission adminmodels.RolePermissions
	if err := db.Where("role_id = ? AND permission_id = ?", rolePermission.RoleId, rolePermission.PermissionId).
		First(&existingRolePermission).Error; err == nil {
		c.JSON(400, gin.H{"error": "RolePermission already exists"})
		return
	}
	if err := db.Create(&rolePermission).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	if err := db.Preload("Role").Preload("Permission").
		First(&rolePermission, rolePermission.ID).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(201, gin.H{"data": rolePermission})
}

// get all role permissions
func GetRolePermissions(c *gin.Context, db *gorm.DB) {
	var rolePermissions []adminmodels.RolePermissions
	if err := db.Preload("Role").Preload("Permission").Find(&rolePermissions).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"data": rolePermissions})
}

// get role permission by role id
func GetRolePermissionByRoleId(c *gin.Context, db *gorm.DB) {
	var rolePermissions []adminmodels.RolePermissions
	if err := db.Preload("Role").Preload("Permission").
		Where("role_id = ?", c.Param("id")).Find(&rolePermissions).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"data": rolePermissions})
}

// delete role permission by id
func DeleteRolePermissionById(c *gin.Context, db *gorm.DB) {
	var rolePermission adminmodels.RolePermissions
	if err := db.Preload("Role").Preload("Permission").
		First(&rolePermission, c.Param("id")).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	if err := db.Delete(&rolePermission).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"data": rolePermission})
}
