package repository

import (
	"backend/controllers/admin/role_permissions/model"
)

type RolesRepository interface {
	Save(roles model.Roles)
	Update(rolesId model.Roles)
	Delete(rolesId int)
	FindById(rolesId int) (roles model.Roles, err error)
	FindAll() []model.Roles
}
