package admincontrollers

import (
	"errors"
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
	serialNumberErr := db.Where("serial_number = ?", device.SerialNumber).First(&existingDevice).Error
	if serialNumberErr != nil && !errors.Is(serialNumberErr, gorm.ErrRecordNotFound) {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error checking serial number", serialNumberErr)
		return
	}
	if serialNumberErr == nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Serial number already exists", nil)
		return
	}

	ipAddressErr := db.Where("ip_address = ?", device.IPAddress).First(&existingDevice).Error
	if ipAddressErr != nil && !errors.Is(ipAddressErr, gorm.ErrRecordNotFound) {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error checking IP Address", ipAddressErr)
		return
	}
	if ipAddressErr == nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "IP Address already exists", nil)
		return
	}

	if err := device.Validate(); err != nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Port must be between 0 and 65535", err)
		return
	}

	if err := db.Create(&device).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error creating device", err)
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"data": device,
	})
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

	// Check if the serial number already exists in the database for another device
	var existingDevice adminmodels.Devices
	serialNumberErr := db.Where("serial_number = ? AND id != ?", updatedDevice.SerialNumber, device.ID).First(&existingDevice).Error
	if serialNumberErr != nil && !errors.Is(serialNumberErr, gorm.ErrRecordNotFound) {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error checking serial number", serialNumberErr)
		return
	}
	if serialNumberErr == nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Serial number already exists", nil)
		return
	}

	// Check if the IP address already exists in the database for another device
	ipAddressErr := db.Where("ip_address = ? AND id != ?", updatedDevice.IPAddress, device.ID).First(&existingDevice).Error
	if ipAddressErr != nil && !errors.Is(ipAddressErr, gorm.ErrRecordNotFound) {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error checking IP address", ipAddressErr)
		return
	}
	if ipAddressErr == nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "IP address already exists", nil)
		return
	}

	// Validate the device data (e.g., port validation)
	if err := updatedDevice.Validate(); err != nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Invalid device data", err)
		return
	}

	// Update the device fields
	device.SerialNumber = updatedDevice.SerialNumber
	device.IPAddress = updatedDevice.IPAddress
	device.Location = updatedDevice.Location
	device.Name = updatedDevice.Name
	device.Port = updatedDevice.Port
	device.Model = updatedDevice.Model

	// Save the updated device
	if err := db.Save(&device).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error updating device", err)
		return
	}

	// Respond with the updated device data
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
