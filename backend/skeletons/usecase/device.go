package usecase

import (
	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
	"github.com/SolomonAHailu/one-card-system/skeletons/repo"
	// "github.com/gin-gonic/gin"
	// "gorm.io/gorm"
)

type deviceUsecase struct {
	deviceRespository repo.DeviceRepository
}


func NewDeviceUsecase(deviceRespository repo.DeviceRepository) repo.DeviceUsecase {
	return &deviceUsecase{
		deviceRespository: deviceRespository,
	}
}


// CreatedDevice implements repo.DeviceUsecase.
func (d *deviceUsecase) CreatedDevice(createDevice *repo.CreateDeviceReques) (adminmodels.Devices, error) {
	return d.deviceRespository.CreatedDevice(createDevice)
}
