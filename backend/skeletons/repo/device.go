package repo


import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
)

type CreateDeviceReques struct{
	Ctx *gin.Context
	Gm *gorm.DB
}

type DeviceRepository interface{
	CreatedDevice(createDevice *CreateDeviceReques) (adminmodels.Devices, error)
}

type DeviceUsecase interface{
	CreatedDevice(createDevice *CreateDeviceReques) (adminmodels.Devices, error)
}
