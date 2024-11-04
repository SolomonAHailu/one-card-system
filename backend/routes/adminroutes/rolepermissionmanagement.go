package adminroutes

import (
	"github.com/SolomonAHailu/one-card-system/controllers/admincontrollers"
	"github.com/SolomonAHailu/one-card-system/initializers"
	"github.com/SolomonAHailu/one-card-system/middlewares"
	"github.com/gin-gonic/gin"
)

func RegisterAdminRolePermissionManagementRoutes(r *gin.Engine) {
	v1 := r.Group("/api/v1/admin").Use(middlewares.AuthMiddleware(), middlewares.RoleRequired(1))
	{
		//create role permission
		v1.POST("/rolepermission", func(c *gin.Context) {
			admincontrollers.CreateRolePermission(c, initializers.DB)
		})
		//get all role permissions
		v1.GET("/rolepermission", func(c *gin.Context) {
			admincontrollers.GetRolePermissions(c, initializers.DB)
		})
		//get permission by role id
		v1.GET("/rolepermission/:id", func(c *gin.Context) {
			admincontrollers.GetRolePermissionByRoleId(c, initializers.DB)
		})
		//delete role permission by id
		v1.DELETE("/rolepermission/:id", func(c *gin.Context) {
			admincontrollers.DeleteRolePermissionById(c, initializers.DB)
		})
		//update role permissions by role id
		v1.PATCH("/rolepermission/:id", func(c *gin.Context) {
			admincontrollers.UpdateRolePermissions(c, initializers.DB)
		})
	}
}