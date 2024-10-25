package adminmodels

import "gorm.io/gorm"

type UserPermissions struct {
	gorm.Model
	UserId       int         `gorm:"not null;" json:"user_id"`
	PermissionId int         `gorm:"not null;" json:"permission_id"`
	User         Users       `gorm:"foreignKey:UserId;references:ID" json:"user"`
	Permission   Permissions `gorm:"foreignKey:PermissionId;references:ID" json:"permission"`
}
