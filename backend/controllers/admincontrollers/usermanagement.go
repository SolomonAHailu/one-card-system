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

	// Start a transaction to ensure both deletions succeed or fail together
	tx := db.Begin()
	if tx.Error != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error starting transaction", tx.Error)
		return
	}

	// Fetch the user with the given ID
	if err := tx.Preload("Role").First(&user, c.Param("id")).Error; err != nil {
		tx.Rollback()
		utils.ResponseWithError(c, http.StatusNotFound, "User not found", err)
		return
	}

	// Delete related UserPermissions
	if err := tx.Where("user_id = ?", user.ID).Delete(&adminmodels.UserPermissions{}).Error; err != nil {
		tx.Rollback()
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error deleting user permissions", err)
		return
	}

	// Delete the user
	if err := tx.Delete(&user).Error; err != nil {
		tx.Rollback()
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error deleting user", err)
		return
	}

	// Commit the transaction
	if err := tx.Commit().Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error committing transaction", err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User and related permissions deleted successfully", "data": user})
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

// func GetUserForDashboardDisplay(c *gin.Context, db *gorm.DB) {
// 	var totalUsers int64
// 	var totalDevices int64
// 	var totalRoles int64
// 	var totalPermissions int64
// 	var usersByRole []struct {
// 		RoleID   int64  `json:"role_id"`
// 		RoleName string `json:"role_name"`
// 		Count    int64  `json:"count"`
// 	}

// 	// // Get total number of users
// 	// if err := db.Model(&adminmodels.Users{}).Count(&totalUsers).Error; err != nil {
// 	// 	utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching total users", err)
// 	// 	return
// 	// }

// 	// Modified the above
// 	if err := db.Raw("SELECT COUNT(*) FROM users").Scan(&totalUsers).Error; err != nil {
// 		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching total users", err)
// 		return
// 	}

// 	// Get total number of devices
// 	if err := db.Model(&adminmodels.Devices{}).Count(&totalDevices).Error; err != nil {
// 		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching total devices", err)
// 		return
// 	}

// 	// Get total number of roles
// 	if err := db.Model(&adminmodels.Roles{}).Count(&totalRoles).Error; err != nil {
// 		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching total roles", err)
// 		return
// 	}

// 	// Get total number of permissions
// 	if err := db.Model(&adminmodels.Permissions{}).Count(&totalPermissions).Error; err != nil {
// 		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching total permissions", err)
// 		return
// 	}

// 	// Get number of users grouped by role_id with role information
// 	if err := db.Model(&adminmodels.Roles{}).
// 		Select("roles.id as role_id, roles.role_name as role_name, COUNT(users.id) as count").
// 		Joins("LEFT JOIN users ON roles.id = users.role_id").
// 		Group("roles.id, roles.role_name").
// 		Scan(&usersByRole).Error; err != nil {
// 		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching users by role", err)
// 		return
// 	}

//		// Respond with dashboard data
//		c.JSON(http.StatusOK, gin.H{
//			"totalUsers":       totalUsers,
//			"usersByRole":      usersByRole,
//			"totalDevices":     totalDevices,
//			"totalRoles":       totalRoles,
//			"totalPermissions": totalPermissions,
//		})
//	}
func GetUserForDashboardDisplay(c *gin.Context, db *gorm.DB) {
	var totalUsers int64
	var totalDevices int64
	var totalRoles int64
	var totalPermissions int64
	var usersByRole []struct {
		RoleID   int64  `json:"role_id"`
		RoleName string `json:"role_name"`
		Count    int64  `json:"count"`
	}

	// Get total number of users excluding soft-deleted users
	if err := db.Model(&adminmodels.Users{}).Where("deleted_at IS NULL").Count(&totalUsers).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching total users", err)
		return
	}

	// Get total number of devices excluding soft-deleted devices
	if err := db.Model(&adminmodels.Devices{}).Where("deleted_at IS NULL").Count(&totalDevices).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching total devices", err)
		return
	}

	// Get total number of roles excluding soft-deleted roles
	if err := db.Model(&adminmodels.Roles{}).Where("deleted_at IS NULL").Count(&totalRoles).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching total roles", err)
		return
	}

	// Get total number of permissions excluding soft-deleted permissions
	if err := db.Model(&adminmodels.Permissions{}).Where("deleted_at IS NULL").Count(&totalPermissions).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching total permissions", err)
		return
	}

	// Get number of users grouped by role_id with role information, excluding soft-deleted users
	if err := db.Model(&adminmodels.Roles{}).
		Select("roles.id as role_id, roles.role_name as role_name, COUNT(users.id) as count").
		Joins("LEFT JOIN users ON roles.id = users.role_id AND users.deleted_at IS NULL").
		Group("roles.id, roles.role_name").
		Having("roles.deleted_at IS NULL").
		Scan(&usersByRole).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching users by role", err)
		return
	}

	// Respond with dashboard data
	c.JSON(http.StatusOK, gin.H{
		"totalUsers":       totalUsers,
		"usersByRole":      usersByRole,
		"totalDevices":     totalDevices,
		"totalRoles":       totalRoles,
		"totalPermissions": totalPermissions,
	})
}
