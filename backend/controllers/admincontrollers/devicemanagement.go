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
	if device.SerialNumber == "" {
		utils.ResponseWithError(c, http.StatusBadRequest, "Serial number cannot be empty", nil)
		return
	}
	var existingDevice adminmodels.Devices
	if err := db.Where("serial_number = ?", device.SerialNumber).First(&existingDevice).Error; err == nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Serial number already exists", nil)
		return
	}

	if err := db.Create(&device).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error creating device", err)
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "Device successfully created", "data": device})
}

// get all devices
func GetAllDevices(c *gin.Context, db *gorm.DB) {
	var devices []adminmodels.Devices
	if err := db.Find(&devices).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching devices", err)
		return
	}
	deviceCount := len(devices)
	c.JSON(http.StatusOK, gin.H{"count": deviceCount, "data": devices})
}

// get device by id
func GetDeviceById(c *gin.Context, db *gorm.DB) {
	var device adminmodels.Devices
	if err := db.First(&device, c.Param("id")).Error; err != nil {
		utils.ResponseWithError(c, http.StatusNotFound, "Device not found", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": device})
}

// update device by id with location type and ID
func UpdateDeviceById(c *gin.Context, db *gorm.DB) {
	var device adminmodels.Devices
	if err := db.First(&device, c.Param("id")).Error; err != nil {
		utils.ResponseWithError(c, http.StatusNotFound, "Device not found", err)
		return
	}

	// Bind JSON data to the device
	if err := c.ShouldBindJSON(&device); err != nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Invalid input", err)
		return
	}
	if err := db.Save(&device).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error updating device", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Device successfully updated", "data": device})
}

// delete device by id
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
