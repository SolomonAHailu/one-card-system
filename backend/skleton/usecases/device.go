package usecases

import (
	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
	"github.com/SolomonAHailu/one-card-system/skleton/repositories"
	
)

// getAllDevicesUsecase struct
type getAllDevicesUsecase struct {
	getAllDevicesRepository repositories.GetAllDeviceRepository
}

// NewGetAllDevicesUsecase creates a new instance of GetAllDevicesUsecase
func NewGetAllDevicesUsecase(getAllDevicesRepository repositories.GetAllDeviceRepository) repositories.GetAllDevicesUsecase {
	return &getAllDevicesUsecase{
		getAllDevicesRepository: getAllDevicesRepository,
	}
}

// GetAllDevices method
func (u *getAllDevicesUsecase) GetAllDevices(getAllDevices *repositories.GetAllDeviceRequest) ([]adminmodels.Devices, error) {
	return u.getAllDevicesRepository.GetAllDevices(getAllDevices)
}
