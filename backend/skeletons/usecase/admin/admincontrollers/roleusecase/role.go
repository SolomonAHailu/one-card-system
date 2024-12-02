package roleusecase

import (
	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
	"github.com/SolomonAHailu/one-card-system/skeletons/repo/admin/admincontrollers/rolemanagement"
	// "github.com/gin-gonic/gin"
	// "gorm.io/gorm"
)

type roleUsecase struct {
	roleRespository rolemanagement.RoleRepository
}


func NewRoleUsecase(roleRespository rolemanagement.RoleRepository) rolemanagement.RoleUsecase {
	return &roleUsecase{
		roleRespository: roleRespository,
	}
}


// CreatedRole implements rolemanagement.RoleUsecase.
func (d *roleUsecase) CreatedRole(createRole *rolemanagement.CreateRoleRequest) (adminmodels.Roles, error) {
	return d.roleRespository.CreatedRole(createRole)
}

func (d *roleUsecase) GetRoles(createRole *rolemanagement.CreateRoleRequest) (adminmodels.Roles, error) {
	return d.roleRespository.GetRoles(createRole)
}

func (d *roleUsecase) GetRole(createRole *rolemanagement.CreateRoleRequest) (adminmodels.Roles, error) {
	return d.roleRespository.GetRole(createRole)
}

func (d *roleUsecase) UpdateRole(createRole *rolemanagement.CreateRoleRequest) (adminmodels.Roles, error) {
	return d.roleRespository.UpdateRole(createRole)
}

func (d *roleUsecase) DeleteRole(createRole *rolemanagement.CreateRoleRequest) (adminmodels.Roles, error) {
	return d.roleRespository.DeleteRole(createRole)
}
