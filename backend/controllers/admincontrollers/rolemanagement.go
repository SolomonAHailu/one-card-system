package admincontrollers

import (
	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// create role for the user
func CreateRole(c *gin.Context, db *gorm.DB) {
	var role adminmodels.Roles
	if err := c.ShouldBindJSON(&role); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	if err := db.Create(&role).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(201, gin.H{"data": role})
}

// get all roles
func GetRoles(c *gin.Context, db *gorm.DB) {
	var roles []adminmodels.Roles
	if err := db.Find(&roles).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"data": roles})
}

// get role by id
func GetRole(c *gin.Context, db *gorm.DB) {
	var role adminmodels.Roles
	if err := db.First(&role, c.Param("id")).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"data": role})
}

// update role by id
func UpdateRole(c *gin.Context, db *gorm.DB) {
	var role adminmodels.Roles
	if err := db.First(&role, c.Param("id")).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	if err := c.ShouldBindJSON(&role); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	if err := db.Save(&role).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"data": role})
}

// delete role by id
func DeleteRole(c *gin.Context, db *gorm.DB) {
	var role adminmodels.Roles
	if err := db.First(&role, c.Param("id")).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	if err := db.Delete(&role).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"data": role})
}
