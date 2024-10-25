package repository

import (
	"backend/controllers/admin/role_permissions/data/request"
	"backend/controllers/admin/role_permissions/helper"
	"backend/controllers/admin/role_permissions/model"
	"errors"

	"gorm.io/gorm"
)

type PermissionsRepositoryImpl struct {
	Db *gorm.DB
}

func NewPermissionsRepositoryImpl(Db *gorm.DB) PermissionsRepository {
	return &PermissionsRepositoryImpl{Db: Db}
}

func (t PermissionsRepositoryImpl) Save(permissions model.Permissions) {
	result := t.Db.Create(&permissions)
	helper.ErrorPanic(result.Error)

}

func (t PermissionsRepositoryImpl) Update(permissions model.Permissions) {
	var updateTag = request.UpdatePermissionsRequest{
		Id:          permissions.Id,
		Name:        permissions.Name,
		Description: permissions.Description,
	}
	result := t.Db.Model(&permissions).Updates(updateTag)
	helper.ErrorPanic(result.Error)
}

func (t PermissionsRepositoryImpl) Delete(permissionsId int) {
	var permissions model.Permissions
	result := t.Db.Where("id = ?", permissionsId).Delete(&permissions)
	helper.ErrorPanic(result.Error)
}

func (t PermissionsRepositoryImpl) FindById(permissionsId int) (model.Permissions, error) {
	var tag model.Permissions
	result := t.Db.Find(&tag, permissionsId)
	if result != nil {
		return tag, nil
	} else {
		return tag, errors.New("tag is not found")
	}
}

func (t PermissionsRepositoryImpl) FindAll() []model.Permissions {
	var permissions []model.Permissions
	results := t.Db.Find(&permissions)
	helper.ErrorPanic(results.Error)
	return permissions
}
