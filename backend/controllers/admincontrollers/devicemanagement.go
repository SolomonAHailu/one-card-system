package admincontrollers

import (
	"net/http"

	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
	// "github.com/SolomonAHailu/one-card-system/models/cafeteriamodels"
	// "github.com/SolomonAHailu/one-card-system/models/dormitorymodels"
	// "github.com/SolomonAHailu/one-card-system/models/librarymodels"
	// "github.com/SolomonAHailu/one-card-system/models/maingatemodels"
	"github.com/SolomonAHailu/one-card-system/utils"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// create device with location type and ID
func CreateDevice(c *gin.Context, db *gorm.DB) {
	var device adminmodels.Devices
	if err := c.ShouldBindJSON(&device); err != nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Invalid input", err)
		return
	}
	if err := device.ValidateDevice(db); err != nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Invalid input", err)
		return
	}
	if err := db.Create(&device).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error creating device", err)
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Device successfully created",
		"data":    device,
	})
}

// get all devices
func GetAllDevices(c *gin.Context, db *gorm.DB) {
	var devices []adminmodels.Devices
	if err := db.Order("updated_at DESC").Find(&devices).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching devices", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Devices successfully fetched", "data": devices})
}

// Get device by id
func GetDeviceById(c *gin.Context, db *gorm.DB) {
	var device adminmodels.Devices
	if err := db.First(&device, c.Param("id")).Error; err != nil {
		utils.ResponseWithError(c, http.StatusNotFound, "Device not found", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Device successfully fetched", "data": device})
}

// UpdateDeviceById updates a device by ID with location type and ID
func UpdateDeviceById(c *gin.Context, db *gorm.DB) {
	var device adminmodels.Devices

	// Fetch the device by ID
	if err := db.First(&device, c.Param("id")).Error; err != nil {
		utils.ResponseWithError(c, http.StatusNotFound, "Device not found", err)
		return
	}

	// Parse the incoming request payload into a temporary variable
	var updatedDevice adminmodels.Devices
	if err := c.ShouldBindJSON(&updatedDevice); err != nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Invalid input", err)
		return
	}

	// Validate the updated device data
	if err := updatedDevice.ValidateDeviceForUpdate(db, device.ID); err != nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Validation error", err)
		return
	}

	// Use GORM's Updates method to update the device
	if err := db.Model(&device).Updates(updatedDevice).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error updating device", err)
		return
	}

	// Respond with the updated device data
	c.JSON(http.StatusOK, gin.H{"message": "Device successfully updated", "data": device})
}

// Delete device by id
func DeleteDeviceById(c *gin.Context, db *gorm.DB) {
	var device adminmodels.Devices
	if err := db.First(&device, c.Param("id")).Error; err != nil {
		utils.ResponseWithError(c, http.StatusNotFound, "Device not found", err)
		return
	}
	if err := db.Delete(&device).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error deleting device", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Device successfully deleted", "data": device})
}
