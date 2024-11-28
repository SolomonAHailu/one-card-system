package repo

import (
	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type CreateDeviceRequest struct{
	Ctx *gin.Context
	Gm *gorm.DB
}
type GetAllDeviceRequest struct{
	Ctx *gin.Context
	Gm *gorm.DB
}

type DeviceRepository interface{
	CreatedDevice(createDevice *CreateDeviceRequest) (adminmodels.Devices, error)
}

type DeviceUsecase interface{
	CreatedDevice(createDevice *CreateDeviceRequest) (adminmodels.Devices, error)
}

type GetALLDeviceRepository interface{
	GetAllDevices(getAllDevice *GetAllDeviceRequest) ([]adminmodels.Devices, error)
}
type GetALLDeviceUsecase interface{
	GetAllDevices(getAllDevice *GetAllDeviceRequest) ([]adminmodels.Devices, error)
}
