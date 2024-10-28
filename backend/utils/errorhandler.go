package utils

import (
	"log"

	"github.com/gin-gonic/gin"
)

func ResponseWithError(ctx *gin.Context, status int, message string, err ...error) {
	if len(err) > 0 && err[0] != nil {
		log.Printf("Error: %v", err[0])
		ctx.JSON(status, gin.H{"error": err[0].Error()})
	} else {
		ctx.JSON(status, gin.H{"error": message + " OR an internal server error occurred, please try again later"})
	}
}
