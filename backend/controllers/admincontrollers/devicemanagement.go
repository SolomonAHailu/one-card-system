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

	// // Validate LocationType and LocationID
	// if err := validateLocationTypeAndID(db, device.LocationType, *device.LocationID); err != nil {
	// 	utils.ResponseWithError(c, http.StatusBadRequest, "Invalid location type or ID", err)
	// 	return
	// }

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

	// // Validate LocationType and LocationID
	// if err := validateLocationTypeAndID(db, device.LocationType, *device.LocationID); err != nil {
	// 	utils.ResponseWithError(c, http.StatusBadRequest, "Invalid location type or ID", err)
	// 	return
	// }

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

// get devices by location_id and location_type with pagination and name filter
// func GetDevicesByLocationId(c *gin.Context, db *gorm.DB) {
// 	var devices []adminmodels.Devices
// 	var total int64
// 	locationID := c.Param("location_id")
// 	locationType := c.Query("location_type") // Expecting a query parameter for location type

// 	page := c.DefaultQuery("page", "1")
// 	limit := c.DefaultQuery("limit", "10")
// 	name := c.Query("name") // Optional name filter

// 	pageInt, err := strconv.Atoi(page)
// 	if err != nil || pageInt < 1 {
// 		pageInt = 1
// 	}
// 	limitInt, err := strconv.Atoi(limit)
// 	if err != nil || limitInt < 1 {
// 		limitInt = 10
// 	}

// 	// Start query with location_type and location_id filter
// 	query := db.Model(&adminmodels.Devices{}).Where("location_id = ? AND location_type = ?", locationID, locationType)

// 	// Apply name filter if provided
// 	if name != "" {
// 		query = query.Where("LOWER(name) LIKE LOWER(?)", "%"+name+"%")
// 	}

// 	// Get total count for pagination
// 	if err := query.Count(&total).Error; err != nil {
// 		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching devices count", err)
// 		return
// 	}

// 	// Fetch the paginated data with name filtering
// 	if err := query.
// 		Limit(limitInt).
// 		Offset((pageInt - 1) * limitInt).
// 		Find(&devices).Error; err != nil {
// 		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching devices", err)
// 		return
// 	}

// 	totalPages := int64(math.Ceil(float64(total) / float64(limitInt)))

// 	c.JSON(http.StatusOK, gin.H{
// 		"data":         devices,
// 		"currentPage":  pageInt,
// 		"totalPages":   totalPages,
// 		"totalDevices": total,
// 	})
// }

// // validateLocationTypeAndID validates the combination of LocationType and LocationID
// func validateLocationTypeAndID(db *gorm.DB, locationType string, locationID int) error {
// 	switch locationType {
// 	case "Cafeteria":
// 		var cafeteria cafeteriamodels.Cafeterias
// 		if err := db.First(&cafeteria, locationID).Error; err != nil {
// 			return errors.New("invalid cafeteria ID")
// 		}
// 	case "Library":
// 		var library librarymodels.Libraries
// 		if err := db.First(&library, locationID).Error; err != nil {
// 			return errors.New("invalid library ID")
// 		}
// 	case "MainGate":
// 		var gate maingatemodels.MainGates
// 		if err := db.First(&gate, locationID).Error; err != nil {
// 			return errors.New("invalid gate ID")
// 		}
// 	case "Dormitory":
// 		var dormitory dormitorymodels.Dormitories
// 		if err := db.First(&dormitory, locationID).Error; err != nil {
// 			return errors.New("invalid dormitory ID")
// 		}
// 	default:
// 		return errors.New("invalid location type")
// 	}
// 	return nil
// }
