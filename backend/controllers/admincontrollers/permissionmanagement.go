package admincontrollers

import (
	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// create permission for the user
func CreatePermission(c *gin.Context, db *gorm.DB) {
	var permission adminmodels.Permissions
	if err := c.ShouldBindJSON(&permission); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	if err := db.Create(&permission).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(201, gin.H{"data": permission})
}

// get all permissions
func GetPermissions(c *gin.Context, db *gorm.DB) {
	var permissions []adminmodels.Permissions
	if err := db.Find(&permissions).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"data": permissions})
}

// get permission by id
func GetPermission(c *gin.Context, db *gorm.DB) {
	var permission adminmodels.Permissions
	if err := db.First(&permission, c.Param("id")).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"data": permission})
}

// update permission by id
func UpdatePermission(c *gin.Context, db *gorm.DB) {
	var permission adminmodels.Permissions
	if err := db.First(&permission, c.Param("id")).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	if err := c.ShouldBindJSON(&permission); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	if err := db.Save(&permission).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"data": permission})
}

// delete permission by id
func DeletePermission(c *gin.Context, db *gorm.DB) {
	var permission adminmodels.Permissions
	if err := db.First(&permission, c.Param("id")).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	if err := db.Delete(&permission).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(204, gin.H{"data": permission})
}
