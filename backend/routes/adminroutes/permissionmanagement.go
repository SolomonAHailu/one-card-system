package adminroutes

import (
	"github.com/SolomonAHailu/one-card-system/controllers/admincontrollers"
	"github.com/SolomonAHailu/one-card-system/initializers"
	"github.com/gin-gonic/gin"
)

func RegisterAdminPermissionManagementRoutes(r *gin.Engine) {
	v1 := r.Group("/api/v1/admin")
	{
		v1.POST("/permissions", func(c *gin.Context) {
			admincontrollers.CreatePermission(c, initializers.DB)
		})
		v1.GET("/permissions", func(c *gin.Context) {
			admincontrollers.GetPermissions(c, initializers.DB)
		})
		v1.GET("/permissions/:id", func(c *gin.Context) {
			admincontrollers.GetPermission(c, initializers.DB)
		})
		v1.PATCH("/permissions/:id", func(c *gin.Context) {
			admincontrollers.UpdatePermission(c, initializers.DB)
		})
		v1.DELETE("/permissions/:id", func(c *gin.Context) {
			admincontrollers.DeletePermission(c, initializers.DB)
		})
	}
}
