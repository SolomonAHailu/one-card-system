package adminmodels

import (
	"crypto/rand"
	"encoding/base64"
	"errors"
	"fmt"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type Users struct {
	gorm.Model
	FirstName        string `gorm:"type:varchar(255);not null;" json:"first_name"`
	FatherName       string `gorm:"type:varchar(255);not null;" json:"father_name"`
	GrandFatherName  string `gorm:"type:varchar(255);not null;" json:"grand_father_name"`
	Email            string `gorm:"type:varchar(255);not null;unique;" json:"email"`
	Password         string `gorm:"type:varchar(255);not null;" json:"-"`
	UnhashedPassword string `gorm:"-" json:"password"`
	RoleId           int    `gorm:"not null;" json:"role_id"`
	Role             Roles  `gorm:"foreignKey:RoleId;references:ID" json:"role"`
}

func (u *Users) BeforeSave(tx *gorm.DB) (err error) {
	password, err := generateRandomPassword(6)
	if err != nil {
		return err
	}
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.Password = string(hashedPassword)
	u.UnhashedPassword = password

	return nil
}

func generateRandomPassword(length int) (string, error) {
	bytes := make([]byte, length)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return base64.RawStdEncoding.EncodeToString(bytes)[:length], nil
}

func (u *Users) ValidateUser(db *gorm.DB) error {
	if u.FirstName == "" {
		return errors.New("first name is required")
	}
	if u.FatherName == "" {
		return errors.New("father name is required")
	}
	if u.GrandFatherName == "" {
		return errors.New("grand father name is required")
	}
	if u.Email == "" {
		return errors.New("email is required")
	}
	if u.Password == "" {
		return errors.New("password is required")
	}
	if u.RoleId == 0 {
		return errors.New("role is required")
	}
	var count int64
	if err := db.Model(&Users{}).Where("email = ? AND deleted_at IS NULL", u.Email).Count(&count).Error; err != nil {
		return fmt.Errorf("error checking email uniqueness: %v", err)
	}
	if count > 0 {
		return fmt.Errorf("email must be unique: %s", u.Email)
	}
	return nil
}

func (u *Users) ValidateUserForUpdate(db *gorm.DB, currentID uint) error {
	if u.FirstName == "" {
		return errors.New("first name is required")
	}
	if u.FatherName == "" {
		return errors.New("father name is required")
	}
	if u.GrandFatherName == "" {
		return errors.New("grand father name is required")
	}
	if u.Email == "" {
		return errors.New("email is required")
	}
	if u.RoleId == 0 {
		return errors.New("role is required")
	}
	var count int64
	if err := db.Model(&Users{}).Where("email = ? AND id != ? AND deleted_at IS NULL", u.Email, currentID).Count(&count).Error; err != nil {
		return fmt.Errorf("error checking email uniqueness: %v", err)
	}
	if count > 0 {
		return fmt.Errorf("email must be unique: %s", u.Email)
	}
	return nil
}
