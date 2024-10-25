package adminroutes

import (
	"github.com/SolomonAHailu/one-card-system/controllers/admincontrollers"
	"github.com/SolomonAHailu/one-card-system/initializers"
	"github.com/gin-gonic/gin"
)

func RegisterUserPermissionManagementRoutes(r *gin.Engine) {
	v1 := r.Group("/api/v1/admin")
	{
		//create user permission route
		v1.POST("/createuserpermission", func(c *gin.Context) {
			admincontrollers.CreateUserPermission(c, initializers.DB)
		})
	}
}
