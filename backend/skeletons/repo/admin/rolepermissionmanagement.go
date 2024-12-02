package adminRepo


import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
)

type RolepermissionmanagementReques struct{
	Ctx *gin.Context
	Gm *gorm.DB
}

type RolepermissionmanagementRepository interface{
	CreateRolePermission(createRolepermission *CreateDeviceReques) (adminmodels.Devices, error)
	GetRolePermissions(getRolepermission *CreateDeviceReques) (adminmodels.Devices, error)
	GetRolePermissionByRoleId(getRolepermissionBy *CreateDeviceReques) (adminmodels.Devices, error)
	DeleteRolePermissionById(createDevice *CreateDeviceReques) (adminmodels.Devices, error)
	UpdateRolePermissions(createDevice *CreateDeviceReques) (adminmodels.Devices, error)
}

type RolepermissionmanagementUsecase interface{
	CreateRolePermission(createDevice *CreateDeviceReques) (adminmodels.Devices, error)
	GetRolePermissions(createDevice *CreateDeviceReques) (adminmodels.Devices, error)
	GetRolePermissionByRoleId(createDevice *CreateDeviceReques) (adminmodels.Devices, error)
	DeleteRolePermissionById(createDevice *CreateDeviceReques) (adminmodels.Devices, error)
	UpdateRolePermissions(createDevice *CreateDeviceReques) (adminmodels.Devices, error)
}


