package adminUsecase

import (
	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
	"github.com/SolomonAHailu/one-card-system/skeletons/repo/admin"
	// "github.com/gin-gonic/gin"
	// "gorm.io/gorm"
)

type userpermissionmanagementUsecase struct {
	userpermissionmanagementRepository adminRepo.UserpermissionmanagementRepository
}

func NewUserPermissionManagementUsecase(userpermissionmanagementRepository adminRepo.UserpermissionmanagementRepository) adminRepo.UserpermissionmanagementUsecase {
	return &userpermissionmanagementUsecase{
		userpermissionmanagementRepository: userpermissionmanagementRepository,
	}
}

// CreateUserPermission implements adminRepo.UserpermissionmanagementUsecase.
func (u *userpermissionmanagementUsecase) CreateUserPermission(userPermissionManagementRequest *adminRepo.UserPermissionManagementRequest) ([]adminmodels.Permissions, error) {
	return u.userpermissionmanagementRepository.CreateUserPermission(userPermissionManagementRequest)
}

// GetUserPermission implements adminRepo.UserpermissionmanagementUsecase.
func (u *userpermissionmanagementUsecase) GetUserPermission(userPermissionManagementRequest *adminRepo.UserPermissionManagementRequest) ([]adminmodels.Permissions, error) {
	return u.userpermissionmanagementRepository.GetUserPermission(userPermissionManagementRequest)
}

// HandleUserPermissionUpdate implements adminRepo.UserpermissionmanagementUsecase.
func (u *userpermissionmanagementUsecase) HandleUserPermissionUpdate(userPermissionManagementRequest *adminRepo.UserPermissionManagementRequest) ([]adminmodels.Permissions, error) {
	return u.userpermissionmanagementRepository.HandleUserPermissionUpdate(userPermissionManagementRequest)
}


