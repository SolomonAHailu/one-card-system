package usecase

import (
	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
	admincontrollers "github.com/SolomonAHailu/one-card-system/skeletons/repo/admin/admincontrollers"
	// "github.com/gin-gonic/gin"
	// "gorm.io/gorm"
)

type deviceUsecase struct {
	deviceRespository admincontrollers.DeviceRepository
}

type getAllDeviceUsecase struct {
	getAllDeviceRespository admincontrollers.GetALLDeviceRepository
}

func NewDeviceUsecase(deviceRespository admincontrollers.DeviceRepository) admincontrollers.DeviceUsecase {
	return &deviceUsecase{
		deviceRespository: deviceRespository,
	}
}
func NewGetAllDeviceUsecase(getAllDeviceRespository admincontrollers.GetALLDeviceRepository) admincontrollers.GetALLDeviceUsecase {
	return &getAllDeviceUsecase{
		getAllDeviceRespository: getAllDeviceRespository,
	}
}

// CreatedDevice implements admincontrollers.DeviceUsecase.
func (d *deviceUsecase) CreatedDevice(createDevice *admincontrollers.CreateDeviceRequest) (adminmodels.Devices, error) {
	return d.deviceRespository.CreatedDevice(createDevice)
}
func (d *getAllDeviceUsecase) GetAllDevices(getAllDevice *admincontrollers.GetAllDeviceRequest) ([]adminmodels.Devices, error) {
	return d.getAllDeviceRespository.GetAllDevices(getAllDevice)
}
