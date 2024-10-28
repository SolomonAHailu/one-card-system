package admincontrollers

import (
	"net/http"

	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
	"github.com/SolomonAHailu/one-card-system/utils"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// create user
func CreateUser(c *gin.Context, db *gorm.DB) {
	var user adminmodels.Users
	if err := c.ShouldBindJSON(&user); err != nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Invalid input", err)
		return
	}
	if user.Email == "" {
		utils.ResponseWithError(c, http.StatusBadRequest, "email cannot be empty", nil)
		return
	}
	var existingUser adminmodels.Users
	if err := db.Where("email = ?", user.Email).First(&existingUser).Error; err == nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "email already exists", nil)
		return
	}
	if err := db.Create(&user).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error creating user", err)
		return
	}
	if err := db.Preload("Role").First(&user, user.ID).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching user role", err)
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": user})
}

// get all users
func GetAllUsers(c *gin.Context, db *gorm.DB) {
	var users []adminmodels.Users
	if err := db.Preload("Role").Find(&users).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching users", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": users})
}

// get user by id
func GetUserById(c *gin.Context, db *gorm.DB) {
	var user adminmodels.Users
	if err := db.Preload("Role").First(&user, c.Param("id")).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching user", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": user})
}

// update user by id
func UpdateUserById(c *gin.Context, db *gorm.DB) {
	var user adminmodels.Users
	if err := db.First(&user, c.Param("id")).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching user", err)
		return
	}
	if err := c.ShouldBindJSON(&user); err != nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Invalid input", err)
		return
	}
	if err := db.Save(&user).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error updating user", err)
		return
	}
	if err := db.Preload("Role").First(&user, user.ID).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching user role", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": user})
}

// delete user by id
func DeleteUserById(c *gin.Context, db *gorm.DB) {
	var user adminmodels.Users
	if err := db.Preload("Role").First(&user, c.Param("id")).Error; err != nil {
		utils.ResponseWithError(c, http.StatusNotFound, "User not found", err)
		return
	}

	if err := db.Delete(&user).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error deleting user", err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}
