package initializers

import (
	"log"
	"os"
	"path/filepath"

	"github.com/joho/godotenv"
)

func LoadEnvVariables() {
	currentDir, err := os.Getwd()
	if err != nil {
		log.Fatalf("Error getting current working directory: %v", err)
	}
	envPath := filepath.Join(currentDir, ".env")

	if _, err := os.Stat(envPath); os.IsNotExist(err) {
		defaultPath := filepath.Join("../", ".env")
		log.Printf("Defaulting to .env file at %s", defaultPath)
		envPath = defaultPath
	}

	// Load the .env file
	err = godotenv.Load(envPath)
	if err != nil {
		log.Fatalf("Error loading .env file from %s: %v", envPath, err)
	}
	log.Printf(".env file loaded from %s", envPath)
}
