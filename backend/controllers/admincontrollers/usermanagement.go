package admincontrollers

import (
	"math"
	"net/http"
	"strconv"

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
	userId := c.Param("id")

	// Begin a transaction
	tx := db.Begin()
	if tx.Error != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error starting transaction", tx.Error)
		return
	}

	// Fetch the current user within the transaction
	if err := tx.First(&user, userId).Error; err != nil {
		tx.Rollback()
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching user", err)
		return
	}

	// Store the current RoleID for comparison
	currentRoleID := user.RoleId

	// Bind the JSON input to update user fields
	if err := c.ShouldBindJSON(&user); err != nil {
		tx.Rollback()
		utils.ResponseWithError(c, http.StatusBadRequest, "Invalid input", err)
		return
	}

	// Check if RoleID has changed
	if user.RoleId != currentRoleID {
		// Delete all entries in UserPermissions where UserId matches
		if err := tx.Where("user_id = ?", userId).Delete(&adminmodels.UserPermissions{}).Error; err != nil {
			tx.Rollback()
			utils.ResponseWithError(c, http.StatusInternalServerError, "Error deleting user permissions", err)
			return
		}
	}

	// Save the updated user data
	if err := tx.Save(&user).Error; err != nil {
		tx.Rollback()
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error updating user", err)
		return
	}

	// Preload the Role to include role details
	if err := tx.Preload("Role").First(&user, user.ID).Error; err != nil {
		tx.Rollback()
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching user role", err)
		return
	}

	// Commit the transaction
	if err := tx.Commit().Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error committing transaction", err)
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

// get users by using role_id with limit and page number and name of the user if provided
func GetUsersByRoleId(c *gin.Context, db *gorm.DB) {
	var users []adminmodels.Users
	var total int64
	roleID := c.Param("id")

	page := c.DefaultQuery("page", "1")
	limit := c.DefaultQuery("limit", "10")
	name := c.Query("name") // Get the optional 'name' query parameter

	pageInt, err := strconv.Atoi(page)
	if err != nil || pageInt < 1 {
		pageInt = 1
	}
	limitInt, err := strconv.Atoi(limit)
	if err != nil || limitInt < 1 {
		limitInt = 10
	}

	// Start building the query
	query := db.Model(&adminmodels.Users{}).Where("role_id = ?", roleID)

	// Apply name filter if provided
	if name != "" {
		query = query.Where("LOWER(first_name) LIKE LOWER(?) OR LOWER(father_name) LIKE LOWER(?) OR LOWER(grand_father_name) LIKE LOWER(?)", "%"+name+"%", "%"+name+"%", "%"+name+"%")
	}

	// Get total count for pagination
	if err := query.Count(&total).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching users count", err)
		return
	}

	// Fetch the paginated data with preload and name filtering
	if err := query.Preload("Role").
		Limit(limitInt).
		Offset((pageInt - 1) * limitInt).
		Find(&users).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching users", err)
		return
	}

	totalPages := int64(math.Ceil(float64(total) / float64(limitInt)))

	c.JSON(http.StatusOK, gin.H{
		"data":        users,
		"currentPage": pageInt,
		"totalPages":  totalPages,
		"totalUsers":  total,
	})
}
