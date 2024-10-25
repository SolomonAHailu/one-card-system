package routes

import (
	"github.com/SolomonAHailu/one-card-system/routes/adminroutes"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	adminroutes.RegisterAdminRoleManagementRoutes(r)
	adminroutes.RegisterAdminPermissionManagementRoutes(r)
	adminroutes.RegisterAdminRolePermissionManagementRoutes(r)
	adminroutes.RegisterUserManagementRoutes(r)
	adminroutes.RegisterUserPermissionManagementRoutes(r)
}
