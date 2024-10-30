package usercontrollers

import (
	"net/http"

	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
	"github.com/SolomonAHailu/one-card-system/security"
	"github.com/SolomonAHailu/one-card-system/utils"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// Login for the user using email and password
func Login(c *gin.Context, db *gorm.DB) {
	var user adminmodels.Users
	var input adminmodels.Users

	if err := c.ShouldBindJSON(&input); err != nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Invalid input", err)
		return
	}

	if input.Email == "" {
		utils.ResponseWithError(c, http.StatusBadRequest, "email cannot be empty", nil)
		return
	}
	if input.UnhashedPassword == "" {
		utils.ResponseWithError(c, http.StatusBadRequest, "password cannot be empty", nil)
		return
	}

	if err := db.Where("email = ?", input.Email).First(&user).Error; err != nil {
		utils.ResponseWithError(c, http.StatusUnauthorized, "Invalid email", err)
		return
	}

	// Compare the provided password with the stored hashed password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.UnhashedPassword)); err != nil {
		utils.ResponseWithError(c, http.StatusUnauthorized, "Invalid password", err)
		return
	}

	token, err := security.GenerateJwt(user.ID, user.Email, user.RoleId)
	if err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Could not generate token", err)
		return
	}
	if err := db.Preload("Role").First(&user, user.ID).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching user role", err)
		return
	}
	c.SetCookie("token", token, 60*60*24, "/", "localhost", false, true)
	c.JSON(http.StatusOK, gin.H{"data": user, "token": token})
}
