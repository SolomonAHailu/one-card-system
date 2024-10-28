package middlewares

import (
	"net/http"
	"strings"

	"github.com/SolomonAHailu/one-card-system/security"
	"github.com/SolomonAHailu/one-card-system/utils"
	"github.com/gin-gonic/gin"
)

// This enables us interact with the React Frontend
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

// middleware to check if the user is authenticated
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			utils.ResponseWithError(c, http.StatusUnauthorized, "Authorization header required")
			c.Abort()
			return
		}

		// Split "Bearer <token>"
		tokenString := strings.Split(authHeader, "Bearer ")
		if len(tokenString) != 2 {
			utils.ResponseWithError(c, http.StatusUnauthorized, "Authorization format must be Bearer <token>")
			c.Abort()
			return
		}

		// Verify the token
		claims, err := security.VerifyToken(tokenString[1])
		if err != nil {
			utils.ResponseWithError(c, http.StatusUnauthorized, "Invalid or expired token", err)
			c.Abort()
			return
		}

		// Set user information in context
		c.Set("userId", claims.UserId)
		c.Set("userEmail", claims.UserEmail)
		c.Set("userRole", claims.UserRole)

		c.Next()
	}
}

// middleware to check if the user is authorizied to access the route
func RoleRequired(roles ...int) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get the token from the request header
		tokenString := c.Request.Header.Get("Authorization")
		if tokenString == "" {
			utils.ResponseWithError(c, http.StatusUnauthorized, "No authorization token provided", nil)
			c.Abort()
			return
		}

		// Verify the token and extract claims
		claims, err := security.VerifyToken(strings.TrimSpace(strings.Replace(tokenString, "Bearer ", "", 1)))
		if err != nil {
			utils.ResponseWithError(c, http.StatusUnauthorized, "Invalid or expired token", err)
			c.Abort()
			return
		}

		// Check if the user role is allowed to access the route
		for _, role := range roles {
			if claims.UserRole == role {
				c.Next() // User has access, continue to the next handler
				return
			}
		}
		// If the user doesn't have access, return a forbidden error
		utils.ResponseWithError(c, http.StatusForbidden, "You do not have access to this resource")
		c.Abort()
	}
}
