package adminmodels

import "gorm.io/gorm"

type RolePermissions struct {
	gorm.Model
	RoleId       int         `gorm:"not null;" json:"role_id"`
	PermissionId int         `gorm:"not null;" json:"permission_id"`
	Role         Roles       `gorm:"foreignKey:RoleId;references:ID" json:"role"`
	Permission   Permissions `gorm:"foreignKey:PermissionId;references:ID" json:"permission"`
}
