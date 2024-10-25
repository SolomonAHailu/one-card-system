package service

import (
	"backend/controllers/admin/role_permissions/data/request"
	"backend/controllers/admin/role_permissions/data/response"
)

type RolesService interface {
	Create(roles request.CreateRolesRequest)
	Update(roles request.UpdateRolesRequest)
	Delete(rolesId int)
	FindById(rolesId int) response.RolesResponse
	FindAll() []response.RolesResponse
}
