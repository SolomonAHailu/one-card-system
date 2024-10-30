package adminroutes

import (
	"github.com/SolomonAHailu/one-card-system/controllers/admincontrollers"
	"github.com/SolomonAHailu/one-card-system/initializers"
	"github.com/SolomonAHailu/one-card-system/middlewares"
	"github.com/gin-gonic/gin"
)

func RegisterUserManagementRoutes(r *gin.Engine) {
	v1 := r.Group("/api/v1/admin").Use(middlewares.AuthMiddleware(), middlewares.RoleRequired(1))
	{
		//create user route
		v1.POST("/createuser", func(c *gin.Context) {
			admincontrollers.CreateUser(c, initializers.DB)
		})
		//get all users route
		v1.GET("/users", func(c *gin.Context) {
			admincontrollers.GetAllUsers(c, initializers.DB)
		})
		//get user by id
		v1.GET("/user/:id", func(c *gin.Context) {
			admincontrollers.GetUserById(c, initializers.DB)
		})
		//update user by id
		v1.PATCH("/user/:id", func(c *gin.Context) {
			admincontrollers.UpdateUserById(c, initializers.DB)
		})
		//delete user by id
		v1.DELETE("/user/:id", func(c *gin.Context) {
			admincontrollers.DeleteUserById(c, initializers.DB)
		})
		//get users using role id
		v1.GET("/users/:id", func(c *gin.Context) {
			admincontrollers.GetUsersByRoleId(c, initializers.DB)
		})
	}
}
