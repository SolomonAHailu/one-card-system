package controller

import (
	"backend/controllers/admin/role_permissions/data/request"
	"backend/controllers/admin/role_permissions/data/response"
	"backend/controllers/admin/role_permissions/helper"
	"backend/controllers/admin/role_permissions/service"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type RoleController struct {
	roleService service.RolesService
}

func NewRoleController(service service.RolesService) *RoleController {
	return &RoleController{roleService: service}
}

func (controller *RoleController) Create(ctx *gin.Context) {
	createRoleRequest := request.CreateRolesRequest{}
	err := ctx.ShouldBindJSON(&createRoleRequest)
	helper.ErrorPanic(err)

	controller.roleService.Create(createRoleRequest)

	webResponse := response.Response{
		Code:   200,
		Status: "Ok",
		Data:   nil,
	}

	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *RoleController) Update(ctx *gin.Context) {
	updateRoleRequest := request.UpdateRolesRequest{}
	err := ctx.ShouldBindJSON(&updateRoleRequest)
	helper.ErrorPanic(err)

	roleId := ctx.Param("roleId")
	id, err := strconv.Atoi(roleId)
	helper.ErrorPanic(err)

	updateRoleRequest.Id = id

	controller.roleService.Update(updateRoleRequest)

	webResponse := response.Response{
		Code:   200,
		Status: "Ok",
		Data:   nil,
	}

	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *RoleController) Delete(ctx *gin.Context) {
	roleId := ctx.Param("roleId")
	id, err := strconv.Atoi(roleId)
	helper.ErrorPanic(err)
	controller.roleService.Delete(id)

	webResponse := response.Response{
		Code:   200,
		Status: "Ok",
		Data:   nil,
	}

	ctx.JSON(http.StatusOK, webResponse)

}

func (controller *RoleController) FindById(ctx *gin.Context) {
	roleId := ctx.Param("roleId")
	id, err := strconv.Atoi(roleId)
	helper.ErrorPanic(err)

	roleResponse := controller.roleService.FindById(id)

	webResponse := response.Response{
		Code:   200,
		Status: "Ok",
		Data:   roleResponse,
	}
	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *RoleController) FindAll(ctx *gin.Context) {
	roleResponse := controller.roleService.FindAll()

	webResponse := response.Response{
		Code:   200,
		Status: "Ok",
		Data:   roleResponse,
	}
	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, webResponse)

}
