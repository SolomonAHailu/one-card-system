package adminroutes

import (
	"github.com/SolomonAHailu/one-card-system/controllers/admincontrollers"
	"github.com/SolomonAHailu/one-card-system/initializers"
	"github.com/SolomonAHailu/one-card-system/middlewares"
	"github.com/gin-gonic/gin"
)

func RegisterUserPermissionManagementRoutes(r *gin.Engine) {
	v1 := r.Group("/api/v1/admin").Use(middlewares.AuthMiddleware(), middlewares.RoleRequired(1))
	{
		//create user permission route
		v1.POST("/createuserpermission", func(c *gin.Context) {
			admincontrollers.CreateUserPermission(c, initializers.DB)
		})
		//get permission for the specific user
		v1.GET("/userpermission/:id", func(c *gin.Context) {
			admincontrollers.GetUserPermission(c, initializers.DB)
		})
	}
}
