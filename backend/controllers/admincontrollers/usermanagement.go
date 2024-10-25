package admincontrollers

import (
	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// create user
func CreateUser(c *gin.Context, db *gorm.DB) {
	var user adminmodels.Users
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{"error": "Invalid input: " + err.Error()})
		return
	}
	if user.UserName == "" {
		c.JSON(400, gin.H{"error": "username cannot be empty"})
		return
	}
	var existingUser adminmodels.Users
	if err := db.Where("user_name = ?", user.UserName).First(&existingUser).Error; err == nil {
		c.JSON(400, gin.H{"error": "username already exists"})
		return
	}
	if err := db.Create(&user).Error; err != nil {
		c.JSON(500, gin.H{"error": "Error creating user: " + err.Error()})
		return
	}
	if err := db.Preload("Role").First(&user, user.ID).Error; err != nil {
		c.JSON(500, gin.H{"error": "Error fetching user role: " + err.Error()})
		return
	}
	c.JSON(201, gin.H{"data": user})
}

// get all users
func GetAllUsers(c *gin.Context, db *gorm.DB) {
	var users []adminmodels.Users
	if err := db.Preload("Role").Find(&users).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"data": users})
}

// get user by id
func GetUserById(c *gin.Context, db *gorm.DB) {
	var user adminmodels.Users
	if err := db.Preload("Role").First(&user, c.Param("id")).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"data": user})
}

// update user by id
func UpdateUserById(c *gin.Context, db *gorm.DB) {
	var user adminmodels.Users
	if err := db.First(&user, c.Param("id")).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	if err := db.Save(&user).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	if err := db.Preload("Role").First(&user, user.ID).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"data": user})
}

// delete user by id
func DeleteUserById(c *gin.Context, db *gorm.DB) {
	var user adminmodels.Users
	if err := db.Preload("Role").First(&user, c.Param("id")).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	if err := db.Delete(&user).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"data": user})
}
