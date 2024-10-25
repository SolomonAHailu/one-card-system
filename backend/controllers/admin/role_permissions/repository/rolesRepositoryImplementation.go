package repository

import (
	"backend/controllers/admin/role_permissions/data/request"
	"backend/controllers/admin/role_permissions/helper"
	"backend/controllers/admin/role_permissions/model"
	"errors"

	"gorm.io/gorm"
)

type RolesRepositoryImpl struct {
	Db *gorm.DB
}

func NewRolesRepositoryImpl(Db *gorm.DB) RolesRepository {
	return &RolesRepositoryImpl{Db: Db}
}

func (t RolesRepositoryImpl) Save(roles model.Roles) {
	result := t.Db.Create(&roles)
	helper.ErrorPanic(result.Error)

}

func (t RolesRepositoryImpl) Update(roles model.Roles) {
	var updateTag = request.UpdateRolesRequest{
		Id:          roles.Id,
		Name:        roles.Name,
		Description: roles.Description,
	}
	result := t.Db.Model(&roles).Updates(updateTag)
	helper.ErrorPanic(result.Error)
}

func (t RolesRepositoryImpl) Delete(rolesId int) {
	var roles model.Roles
	result := t.Db.Where("id = ?", rolesId).Delete(&roles)
	helper.ErrorPanic(result.Error)
}

func (t RolesRepositoryImpl) FindById(rolesId int) (model.Roles, error) {
	var role model.Roles
	result := t.Db.Find(&role, rolesId)
	if result != nil {
		return role, nil
	} else {
		return role, errors.New("tag is not found")
	}
}

func (t RolesRepositoryImpl) FindAll() []model.Roles {
	var roles []model.Roles
	results := t.Db.Find(&roles)
	helper.ErrorPanic(results.Error)
	return roles
}
