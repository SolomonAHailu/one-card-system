package adminmodels

import (
	"errors"
	"fmt"

	"gorm.io/gorm"
)

type Roles struct {
	gorm.Model
	RoleName    string `gorm:"type:varchar(255);not null;unique;" json:"role_name"`
	Description string `gorm:"type:text;not null;" json:"description"`
}

func (r *Roles) ValidateRole(db *gorm.DB) error {
	if r.RoleName == "" {
		return errors.New("role name is required")
	}
	if r.Description == "" {
		return errors.New("description is required")
	}
	var count int64
	if err := db.Model(&Roles{}).Where("role_name = ? AND deleted_at IS NULL", r.RoleName).Count(&count).Error; err != nil {
		return fmt.Errorf("error checking role name uniqueness: %v", err)
	}
	if count > 0 {
		return fmt.Errorf("role name must be unique: %s", r.RoleName)
	}
	return nil
}

func (r *Roles) ValidateRoleForUpdate(db *gorm.DB, currentID ...uint) error {
	if r.RoleName == "" {
		return errors.New("role name is required")
	}
	if r.Description == "" {
		return errors.New("description is required")
	}
	var count int64
	if err := db.Model(&Roles{}).Where("role_name = ? AND id != ? AND deleted_at IS NULL", r.RoleName, currentID).Count(&count).Error; err != nil {
		return fmt.Errorf("error checking role name uniqueness: %v", err)
	}
	if count > 0 {
		return fmt.Errorf("role name must be unique: %s", r.RoleName)
	}
	return nil
}
