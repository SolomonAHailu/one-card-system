package adminmodels

import "gorm.io/gorm"

type Roles struct {
	gorm.Model
	RoleName    string `gorm:"type:varchar(255);not null;" json:"role_name"`
	Description string `gorm:"type:text;not null;" json:"description"`
}
