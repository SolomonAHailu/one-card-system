package routes

import (
	"github.com/SolomonAHailu/one-card-system/controllers"
	"github.com/SolomonAHailu/one-card-system/initializers"
	"github.com/gin-gonic/gin"
)

func RegisterPeopleRoutes(r *gin.Engine) {
	v1 := r.Group("/api/v1")
	{
		v1.GET("/people", func(c *gin.Context) {
			controllers.GetPerson(c, initializers.DB)
		})
		v1.POST("/people", func(c *gin.Context) {
			controllers.CreatePerson(c, initializers.DB)
		})
	}
}
