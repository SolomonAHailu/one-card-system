package gateroutes

import (
	"github.com/SolomonAHailu/one-card-system/controllers/gatecontrollers"
	"github.com/SolomonAHailu/one-card-system/initializers"
	"github.com/SolomonAHailu/one-card-system/middlewares"
	"github.com/gin-gonic/gin"
)

func GateStudentManagementRoutes(r *gin.Engine) {
	v1 := r.Group("/api/v1/gate").Use(middlewares.AuthMiddleware(), middlewares.RoleRequired(3))
	{
		v1.POST("/currentstudent", func(c *gin.Context) {
			gatecontrollers.GetStudentById(c, initializers.DB)
		})
	}
}
