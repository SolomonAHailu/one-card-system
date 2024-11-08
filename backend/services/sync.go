// sync_service.go
package services

import (
	"log"
	"time"

	"github.com/SolomonAHailu/one-card-system/controllers/registrarcontrollers"
	"github.com/SolomonAHailu/one-card-system/initializers"
	"github.com/gin-gonic/gin"
)

// StartSync initializes and starts the sync process
func StartSync() {
	registrarcontrollers.SyncDataFromSMS(&gin.Context{}, initializers.DB)
	log.Println("Initial sync completed.")

	for {
		now := time.Now()
		sixPM := time.Date(now.Year(), now.Month(), now.Day(), 18, 0, 0, 0, now.Location())

		if now.After(sixPM) {
			sixPM = sixPM.Add(24 * time.Hour)
		}

		sleepDuration := sixPM.Sub(now)
		log.Printf("Next sync scheduled for: %s", sixPM)

		time.Sleep(sleepDuration)
		registrarcontrollers.SyncDataFromSMS(&gin.Context{}, initializers.DB)
		time.Sleep(24 * time.Hour)
	}
}
