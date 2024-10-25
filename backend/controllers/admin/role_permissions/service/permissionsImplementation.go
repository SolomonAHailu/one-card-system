package service

import (
	"backend/controllers/admin/role_permissions/data/request"
	"backend/controllers/admin/role_permissions/data/response"
	"backend/controllers/admin/role_permissions/helper"
	"backend/controllers/admin/role_permissions/model"
	"backend/controllers/admin/role_permissions/repository"

	"github.com/go-playground/validator/v10"
)

type PermissionsServiceImpl struct {
	PermissionRepository repository.PermissionsRepository
	Validate             *validator.Validate
}

func NewPermissionserviceImpl(permissionsRepository repository.PermissionsRepository, validate *validator.Validate) PermissionsService {
	return &PermissionsServiceImpl{
		PermissionRepository: permissionsRepository,
		Validate:             validate,
	}
}

func (t PermissionsServiceImpl) Create(permission request.CreatePermissionsRequest) {
	err := t.Validate.Struct(permission)
	helper.ErrorPanic(err)
	permissionsModel := model.Permissions{
		Name:        permission.Name,
		Description: permission.Description,
	}
	t.PermissionRepository.Save(permissionsModel)
}

func (t PermissionsServiceImpl) Update(permission request.UpdatePermissionsRequest) {
	permissionData, err := t.PermissionRepository.FindById(permission.Id)
	helper.ErrorPanic(err)
	permissionData.Name = permission.Name
	t.PermissionRepository.Update(permissionData)
}

func (t PermissionsServiceImpl) Delete(permissionId int) {
	t.PermissionRepository.Delete(permissionId)
}

func (t PermissionsServiceImpl) FindById(permissionId int) response.PermissionsResponse {
	permissionData, err := t.PermissionRepository.FindById(permissionId)
	helper.ErrorPanic(err)

	permissionResponse := response.PermissionsResponse{
		Id:          permissionData.Id,
		Name:        permissionData.Name,
		Description: permissionData.Description,
	}
	return permissionResponse
}

func (t PermissionsServiceImpl) FindAll() []response.PermissionsResponse {
	result := t.PermissionRepository.FindAll()

	var Permissions []response.PermissionsResponse
	for _, value := range result {
		permission := response.PermissionsResponse{
			Id:          value.Id,
			Name:        value.Name,
			Description: value.Description,
		}
		Permissions = append(Permissions, permission)
	}
	return Permissions
}
