package registrarroutes

import (
	"github.com/SolomonAHailu/one-card-system/controllers/registrarcontrollers"
	"github.com/SolomonAHailu/one-card-system/initializers"
	"github.com/SolomonAHailu/one-card-system/middlewares"
	"github.com/gin-gonic/gin"
)

func RegisterStudentManagementRoutes(r *gin.Engine) {
	v1 := r.Group("/api/v1/registrar").Use(middlewares.AuthMiddleware(), middlewares.RoleRequired(1))
	{
		//create user route
		// v1.POST("/createstudent", func(c *gin.Context) {
		// 	registrarcontrollers.CreateStudent(c, initializers.DB)
		// })
		//get all Students route
		v1.GET("/students", func(c *gin.Context) {
			registrarcontrollers.GetStudents(c, initializers.DB)
		})
		//get Student by id
		// v1.GET("/student/:id", func(c *gin.Context) {
		// 	registrarcontrollers.GetStudentById(c, initializers.DB)
		// })
		// //update Student by id
		// v1.PATCH("/student/:id", func(c *gin.Context) {
		// 	registrarcontrollers.UpdateStudentById(c, initializers.DB)
		// })
		// //delete Student by id
		// v1.DELETE("/student/:id", func(c *gin.Context) {
		// 	registrarcontrollers.DeleteStudentById(c, initializers.DB)
		// })

	}
}
