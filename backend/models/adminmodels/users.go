package adminmodels

import (
	"crypto/rand"
	"encoding/base64"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type Users struct {
	gorm.Model
	FirstName        string `gorm:"type:varchar(255);not null;" json:"first_name"`
	FatherName       string `gorm:"type:varchar(255);not null;" json:"father_name"`
	GrandFatherName  string `gorm:"type:varchar(255);not null;" json:"grand_father_name"`
	UserName         string `gorm:"type:varchar(255);not null;unique;" json:"user_name"`
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
