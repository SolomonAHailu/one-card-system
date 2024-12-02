package adminUsecase

import (
	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
	"github.com/SolomonAHailu/one-card-system/skeletons/repo/admin"
	// "github.com/gin-gonic/gin"
	// "gorm.io/gorm"
)

type rolepermissionmanagementUsecase struct {
	RolepermissionmanagementRepository adminRepo.RolepermissionmanagementRepository
}

func NewrolepermissionmanagementUsecase(rolepermissionmanagementRepository adminRepo.RolepermissionmanagementRepository) adminRepo.RolepermissionmanagementUsecase {
	return &rolepermissionmanagementUsecase{
		RolepermissionmanagementRepository: rolepermissionmanagementRepository,
	}
}


// CreateRolePermission implements repo.RolepermissionmanagementUsecase.
func (r *rolepermissionmanagementUsecase) CreateRolePermission(createDevice *adminRepo.CreateDeviceReques) (adminmodels.Devices, error) {
	return r.RolepermissionmanagementRepository.CreateRolePermission(createDevice )
}

// DeleteRolePermissionById implements repo.RolepermissionmanagementUsecase.
func (r *rolepermissionmanagementUsecase) DeleteRolePermissionById(createDevice *adminRepo.CreateDeviceReques) (adminmodels.Devices, error) {
	return r.RolepermissionmanagementRepository.DeleteRolePermissionById(createDevice )
}

// GetRolePermissionByRoleId implements repo.RolepermissionmanagementUsecase.
func (r *rolepermissionmanagementUsecase) GetRolePermissionByRoleId(createDevice *adminRepo.CreateDeviceReques) (adminmodels.Devices, error) {
	return r.RolepermissionmanagementRepository.GetRolePermissionByRoleId(createDevice )
}

// GetRolePermissions implements repo.RolepermissionmanagementUsecase.
func (r *rolepermissionmanagementUsecase) GetRolePermissions(createDevice *adminRepo.CreateDeviceReques) (adminmodels.Devices, error) {
	return r.RolepermissionmanagementRepository.GetRolePermissions(createDevice )
}

// UpdateRolePermissions implements repo.RolepermissionmanagementUsecase.
func (r *rolepermissionmanagementUsecase) UpdateRolePermissions(createDevice *adminRepo.CreateDeviceReques) (adminmodels.Devices, error) {
	return r.RolepermissionmanagementRepository.UpdateRolePermissions(createDevice )
}

