package adminroutes

import (
	"github.com/SolomonAHailu/one-card-system/controllers/admincontrollers"
	"github.com/SolomonAHailu/one-card-system/initializers"
	"github.com/SolomonAHailu/one-card-system/middlewares"
	"github.com/gin-gonic/gin"
)

func RegisterSendEmailManagementRoutes(r *gin.Engine) {
	v1 := r.Group("/api/v1/admin").Use(middlewares.AuthMiddleware(), middlewares.RoleRequired(1))
	{
		// Create device route
		v1.POST("/sendemail", func(c *gin.Context) {
			admincontrollers.SendHTMLEmail(c, initializers.DB)
		})

	}
}
