package adminRepo


import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
)

type UserPermissionManagementRequest struct{
	Ctx *gin.Context
	Gm *gorm.DB
}

type UserpermissionmanagementRepository interface{
	CreateUserPermission(userPermissionManagementRequest *UserPermissionManagementRequest) ([]adminmodels.Permissions, error)
	GetUserPermission(userPermissionManagementRequest *UserPermissionManagementRequest) ([]adminmodels.Permissions, error)
	HandleUserPermissionUpdate(userPermissionManagementRequest *UserPermissionManagementRequest) ([]adminmodels.Permissions, error)
}

type UserpermissionmanagementUsecase interface{
	CreateUserPermission(userPermissionManagementRequest *UserPermissionManagementRequest) ([]adminmodels.Permissions, error)
	GetUserPermission(userPermissionManagementRequest *UserPermissionManagementRequest) ([]adminmodels.Permissions, error)
	HandleUserPermissionUpdate(userPermissionManagementRequest *UserPermissionManagementRequest) ([]adminmodels.Permissions, error)
}
