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

type PermissionsController struct {
	permissionsService service.PermissionsService
}

func NewPermissionsController(service service.PermissionsService) *PermissionsController {
	return &PermissionsController{permissionsService: service}
}

func (controller *PermissionsController) Create(ctx *gin.Context) {
	createPermissionsRequest := request.CreatePermissionsRequest{}
	err := ctx.ShouldBindJSON(&createPermissionsRequest)
	helper.ErrorPanic(err)

	controller.permissionsService.Create(createPermissionsRequest)

	webResponse := response.Response{
		Code:   200,
		Status: "Ok",
		Data:   nil,
	}

	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *PermissionsController) Update(ctx *gin.Context) {
	updatePermissionsRequest := request.UpdatePermissionsRequest{}
	err := ctx.ShouldBindJSON(&updatePermissionsRequest)
	helper.ErrorPanic(err)

	permissionsId := ctx.Param("permissionsId")
	id, err := strconv.Atoi(permissionsId)
	helper.ErrorPanic(err)

	updatePermissionsRequest.Id = id

	controller.permissionsService.Update(updatePermissionsRequest)

	webResponse := response.Response{
		Code:   200,
		Status: "Ok",
		Data:   nil,
	}

	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *PermissionsController) Delete(ctx *gin.Context) {
	permissionsId := ctx.Param("permissionsId")
	id, err := strconv.Atoi(permissionsId)
	helper.ErrorPanic(err)
	controller.permissionsService.Delete(id)

	webResponse := response.Response{
		Code:   200,
		Status: "Ok",
		Data:   nil,
	}

	ctx.JSON(http.StatusOK, webResponse)

}

func (controller *PermissionsController) FindById(ctx *gin.Context) {
	permissionsId := ctx.Param("permissionsId")
	id, err := strconv.Atoi(permissionsId)
	helper.ErrorPanic(err)

	permissionsResponse := controller.permissionsService.FindById(id)

	webResponse := response.Response{
		Code:   200,
		Status: "Ok",
		Data:   permissionsResponse,
	}
	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *PermissionsController) FindAll(ctx *gin.Context) {
	permissionsResponse := controller.permissionsService.FindAll()

	webResponse := response.Response{
		Code:   200,
		Status: "Ok",
		Data:   permissionsResponse,
	}
	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, webResponse)

}
