package service

import (
	"backend/controllers/admin/role_permissions/data/request"
	"backend/controllers/admin/role_permissions/data/response"
)

type PermissionsService interface {
	Create(permissions request.CreatePermissionsRequest)
	Update(permissions request.UpdatePermissionsRequest)
	Delete(permissionsId int)
	FindById(permissionsId int) response.PermissionsResponse
	FindAll() []response.PermissionsResponse
}
