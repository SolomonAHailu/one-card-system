package repositories

import (
	"github.com/SolomonAHailu/one-card-system/models/adminmodels"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type GetAllDeviceRequest struct {
	db *gorm.DB
	c *gin.Context
}

// CreateDeviceRepository is an interface that defines the contract a CreateDeviceRepository type has to implement.
type GetAllDeviceRepository interface {
	GetAllDevices(getAllDevices *GetAllDeviceRequest) ([]adminmodels.Devices, error)
}

// GetAllDevicesUsecase interface
type GetAllDevicesUsecase interface {
	GetAllDevices(getAllDevices *GetAllDeviceRequest) ([]adminmodels.Devices, error)
}
