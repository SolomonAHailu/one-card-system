package service

import (
	"backend/controllers/admin/role_permissions/data/request"
	"backend/controllers/admin/role_permissions/data/response"
	"backend/controllers/admin/role_permissions/helper"
	"backend/controllers/admin/role_permissions/model"
	"backend/controllers/admin/role_permissions/repository"

	"github.com/go-playground/validator/v10"
)

type RolesServiceImpl struct {
	RoleRepository repository.RolesRepository
	Validate       *validator.Validate
}

func NewRolesServiceImpl(roleRepository repository.RolesRepository, validate *validator.Validate) RolesService {
	return &RolesServiceImpl{
		RoleRepository: roleRepository,
		Validate:       validate,
	}
}

func (r RolesServiceImpl) Create(role request.CreateRolesRequest) {
	err := r.Validate.Struct(role)
	helper.ErrorPanic(err)
	roleModel := model.Roles{
		Name:        role.Name,
		Description: role.Description,
	}
	r.RoleRepository.Save(roleModel)
}

func (r RolesServiceImpl) Update(role request.UpdateRolesRequest) {
	roleData, err := r.RoleRepository.FindById(role.Id)
	helper.ErrorPanic(err)
	roleData.Name = role.Name
	roleData.Description = role.Description
	r.RoleRepository.Update(roleData)
}

func (r RolesServiceImpl) Delete(roleId int) {
	r.RoleRepository.Delete(roleId)
}

func (r RolesServiceImpl) FindById(roleId int) response.RolesResponse {
	roleData, err := r.RoleRepository.FindById(roleId)
	helper.ErrorPanic(err)

	roleResponse := response.RolesResponse{
		Id:          roleData.Id,
		Name:        roleData.Name,
		Description: roleData.Description,
	}
	return roleResponse
}

func (r RolesServiceImpl) FindAll() []response.RolesResponse {
	result := r.RoleRepository.FindAll()

	var roles []response.RolesResponse
	for _, value := range result {
		role := response.RolesResponse{
			Id:          value.Id,
			Name:        value.Name,
			Description: value.Description,
		}
		roles = append(roles, role)
	}
	return roles
}
