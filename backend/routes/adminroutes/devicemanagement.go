package adminroutes

import (
	"github.com/SolomonAHailu/one-card-system/controllers/admincontrollers"
	"github.com/SolomonAHailu/one-card-system/initializers"
	"github.com/SolomonAHailu/one-card-system/middlewares"
	"github.com/gin-gonic/gin"
)

func RegisterDeviceManagementRoutes(r *gin.Engine) {
	v1 := r.Group("/api/v1/admin").Use(middlewares.AuthMiddleware(), middlewares.RoleRequired(1))
	{
		// Create device route
		v1.POST("/createdevice", func(c *gin.Context) {
			admincontrollers.CreateDevice(c, initializers.DB)
		})
		// Get all devices route
		v1.GET("/devices", func(c *gin.Context) {
			admincontrollers.GetAllDevices(c, initializers.DB)
		})
		// Get device by ID route
		v1.GET("/device/:id", func(c *gin.Context) {
			admincontrollers.GetDeviceById(c, initializers.DB)
		})
		// Update device by ID route
		v1.PATCH("/device/:id", func(c *gin.Context) {
			admincontrollers.UpdateDeviceById(c, initializers.DB)
		})
		// Delete device by ID route
		v1.DELETE("/device/:id", func(c *gin.Context) {
			admincontrollers.DeleteDeviceById(c, initializers.DB)
		})
		// Get devices by location route
		// v1.GET("/devices/location/:locationId", func(c *gin.Context) {
		// 	admincontrollers.GetDevicesByLocationId(c, initializers.DB)
		// })
	}
}
