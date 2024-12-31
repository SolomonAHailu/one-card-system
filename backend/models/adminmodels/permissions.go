package adminmodels

import (
	"errors"
	"fmt"

	"gorm.io/gorm"
)

type Permissions struct {
	gorm.Model
	PermissionsName string `gorm:"type:varchar(255);not null;unique;" json:"permissions_name"`
	Description     string `gorm:"type:text;not null;" json:"description"`
}

func (p *Permissions) ValidatePermission(db *gorm.DB) error {
	if p.PermissionsName == "" {
		return errors.New("permissions name is required")
	}
	if p.Description == "" {
		return errors.New("description is required")
	}
	var count int64
	if err := db.Model(&Permissions{}).Where("permissions_name = ? AND deleted_at IS NULL", p.PermissionsName).Count(&count).Error; err != nil {
		return fmt.Errorf("error checking permissions name uniqueness: %v", err)
	}
	if count > 0 {
		return fmt.Errorf("permissions name must be unique: %s", p.PermissionsName)
	}
	return nil
}

func (p *Permissions) ValidatePermissionForUpdate(db *gorm.DB, currentID ...uint) error {
	if p.PermissionsName == "" {
		return errors.New("permissions name is required")
	}
	if p.Description == "" {
		return errors.New("description is required")
	}
	var count int64
	if err := db.Model(&Permissions{}).Where("permissions_name = ? AND id != ? AND deleted_at IS NULL", p.PermissionsName, currentID).Count(&count).Error; err != nil {
		return fmt.Errorf("error checking permissions name uniqueness: %v", err)
	}
	if count > 0 {
		return fmt.Errorf("permissions name must be unique: %s", p.PermissionsName)
	}
	return nil
}
