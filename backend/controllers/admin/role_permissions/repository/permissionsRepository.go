package repository

import (
	"backend/controllers/admin/role_permissions/model"
)

type PermissionsRepository interface {
	Save(permissions model.Permissions)
	Update(permissions model.Permissions)
	Delete(permissionsId int)
	FindById(permissionsId int) (permissions model.Permissions, err error)
	FindAll() []model.Permissions
}
