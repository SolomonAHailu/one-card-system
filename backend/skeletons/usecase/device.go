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

func (d *deviceUsecase) GetAllDevices(createDevice *repo.CreateDeviceReques) (adminmodels.Devices, error) {
	return d.deviceRespository.GetAllDevices(createDevice)
}

func (d *deviceUsecase) GetDeviceById(createDevice *repo.CreateDeviceReques) (adminmodels.Devices, error) {
	return d.deviceRespository.GetDeviceById(createDevice)
}

func (d *deviceUsecase) UpdateDeviceById(createDevice *repo.CreateDeviceReques) (adminmodels.Devices, error) {
	return d.deviceRespository.UpdateDeviceById(createDevice)
}

func (d *deviceUsecase) DeleteDeviceById(createDevice *repo.CreateDeviceReques) (adminmodels.Devices, error) {
	return d.deviceRespository.DeleteDeviceById(createDevice)
}
