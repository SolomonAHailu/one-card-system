package registrarroutes

import (
	"github.com/SolomonAHailu/one-card-system/controllers/registrarcontrollers"
	"github.com/SolomonAHailu/one-card-system/initializers"
	"github.com/SolomonAHailu/one-card-system/middlewares"
	"github.com/gin-gonic/gin"
)

func RegisterStudentManagementRoutes(r *gin.Engine) {
	v1 := r.Group("/api/v1/registrar").Use(middlewares.AuthMiddleware(), middlewares.RoleRequired(2))
	{
		//get all Students route
		v1.GET("/students", func(c *gin.Context) {
			registrarcontrollers.GetStudents(c, initializers.DB)
		})
		// get Student by id
		v1.GET("/student/:id", func(c *gin.Context) {
			registrarcontrollers.GetStudentById(c, initializers.DB)
		})
		//update student card number
		v1.PATCH("/student/card/:id", func(c *gin.Context) {
			registrarcontrollers.UpdateStudentCardNumber(c, initializers.DB)
		})
		//update student photo
		v1.PATCH("/student/photo/:id", func(c *gin.Context) {
			registrarcontrollers.UpdateStudentPhoto(c, initializers.DB)
		})
	}
}
