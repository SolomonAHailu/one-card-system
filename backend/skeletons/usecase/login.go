package usecase

import (
	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
	"github.com/SolomonAHailu/one-card-system/skeletons/repo"
	// "github.com/gin-gonic/gin"
	// "gorm.io/gorm"
)

type LoginUserUsecase struct {
	loginUserRepository repo.LoginUserRepository
}


// NewUserUsecase will create new an userUsecase object representation of userUsecase.UserUsecase interface
func NewLoginUserUsecase(loginUserRepository repo.LoginUserRepository) repo.LoginUserUsecase {
	return &LoginUserUsecase{
	loginUserRepository: loginUserRepository,
	}
}


// CreatedUser implements usermanagement.UserUsecase.
func (d *LoginUserUsecase) Login(loginUser *repo.LoginUserRequest) (adminmodels.Users, error) {
	return d.loginUserRepository.Login(loginUser)
}
