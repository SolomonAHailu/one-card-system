package admincontrollers

import (
	"net/http"

	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
	"github.com/SolomonAHailu/one-card-system/utils"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// create permission for the user
func CreatePermission(c *gin.Context, db *gorm.DB) {
	var permission adminmodels.Permissions
	if err := c.ShouldBindJSON(&permission); err != nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Invalid request payload", err)
		return
	}
	var exstingPermission adminmodels.Permissions
	if err := db.Where("permissions_name = ?", permission.PermissionsName).First(&exstingPermission).Error; err == nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Permission already exists", nil)
		return
	}
	if err := db.Create(&permission).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": permission})
}

// get all permissions
func GetPermissions(c *gin.Context, db *gorm.DB) {
	var permissions []adminmodels.Permissions
	if err := db.Find(&permissions).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": permissions})
}

// get permission by id
func GetPermission(c *gin.Context, db *gorm.DB) {
	var permission adminmodels.Permissions
	if err := db.First(&permission, c.Param("id")).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": permission})
}

// update permission by id
func UpdatePermission(c *gin.Context, db *gorm.DB) {
	var permission adminmodels.Permissions
	if err := db.First(&permission, c.Param("id")).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
		return
	}
	if err := c.ShouldBindJSON(&permission); err != nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Invalid request payload", err)
		return
	}
	var exstingPermission adminmodels.Permissions
	if err := db.Where("permissions_name = ?", permission.PermissionsName).First(&exstingPermission).Error; err == nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Permission already exists", nil)
		return
	}
	if err := db.Save(&permission).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": permission})
}

// delete permission by id
func DeletePermission(c *gin.Context, db *gorm.DB) {
	var permission adminmodels.Permissions
	if err := db.First(&permission, c.Param("id")).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
		return
	}
	if err := db.Delete(&permission).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "An internal server error occurred", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": permission})
}
