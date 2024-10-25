package adminmodels

import "gorm.io/gorm"

type Permissions struct {
	gorm.Model
	PermissionsName string `gorm:"type:varchar(255);not null;" json:"permissions_name"`
	Description     string `gorm:"type:text;not null;" json:"description"`
}
