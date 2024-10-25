package admincontrollers

import (
	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// CreateUserPermission creates a new user permission
func CreateUserPermission(c *gin.Context, db *gorm.DB) {
	var userPermission adminmodels.UserPermissions

	// Bind JSON to userPermission
	if err := c.ShouldBindJSON(&userPermission); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	// Retrieve the user based on userId
	var user adminmodels.Users
	if err := db.First(&user, userPermission.UserId).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(404, gin.H{"error": "User not found"})
		} else {
			c.JSON(500, gin.H{"error": err.Error()})
		}
		return
	}

	// Check if the permission exists for the role in RolePermission table
	var rolePermission adminmodels.RolePermissions
	if err := db.Where("role_id = ? AND permission_id = ?", user.RoleId, userPermission.PermissionId).First(&rolePermission).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(404, gin.H{"error": "Permission not found for this user's role"})
		} else {
			c.JSON(500, gin.H{"error": err.Error()})
		}
		return
	}

	// Check for existing user permission
	var existingPermission adminmodels.UserPermissions
	if err := db.Where("user_id = ? AND permission_id = ?", userPermission.UserId, userPermission.PermissionId).First(&existingPermission).Error; err == nil {
		// If a record exists, return an error
		c.JSON(409, gin.H{"error": "User permission already exists"})
		return
	}

	// If permission exists, proceed to create the user permission
	if err := db.Create(&userPermission).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	// Return a success message after creating the user permission
	c.JSON(201, gin.H{"message": "User permission created successfully"})
}
