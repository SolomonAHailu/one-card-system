// package main

// import (
// 	"fmt"
// 	"log"
// 	"os"

// 	"github.com/SolomonAHailu/one-card-system/initializers"
// 	"github.com/SolomonAHailu/one-card-system/server"
// )

// func init() {
// 	initializers.LoadEnvVariables()
// 	initializers.ConnectToDB(os.Getenv("DB_DRIVER"), os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_PORT"), os.Getenv("DB_HOST"), os.Getenv("DB_NAME"))
// 	// migrations.Migrate(os.Getenv("DB_DRIVER"), os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_PORT"), os.Getenv("DB_HOST"), os.Getenv("DB_NAME"))
// }

// func main() {
// 	if initializers.DB == nil {
// 		log.Fatal("Database connection is not initialized")
// 	}
// 	s := server.NewServer()
// 	s.Initialize()
// 	serverPort := fmt.Sprintf(":%s", os.Getenv("API_PORT"))
// 	s.Run(serverPort)
// }

package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/SolomonAHailu/one-card-system/backend/controllers/registrarcontrollers"
	"github.com/SolomonAHailu/one-card-system/initializers"
	"github.com/SolomonAHailu/one-card-system/server"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB(os.Getenv("DB_DRIVER"), os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_PORT"), os.Getenv("DB_HOST"), os.Getenv("DB_NAME"))
	// migrations.Migrate(os.Getenv("DB_DRIVER"), os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_PORT"), os.Getenv("DB_HOST"), os.Getenv("DB_NAME"))
}

func main() {
	if initializers.DB == nil {
		log.Fatal("Database connection is not initialized")
	}

	// Start periodic sync as a Goroutine
	go startPeriodicSync()

	// Initialize and run the server
	s := server.NewServer()
	s.Initialize()
	serverPort := fmt.Sprintf(":%s", os.Getenv("API_PORT"))
	s.Run(serverPort)
}

// startPeriodicSync sets up a periodic sync with a specific interval
func startPeriodicSync() {
	interval := 1 * time.Hour // Define your interval here
	for {
		time.Sleep(interval)
		registrarcontrollers.SyncDataFromSMS(initializers.DB)
	}
}
