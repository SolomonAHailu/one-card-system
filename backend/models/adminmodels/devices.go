package adminmodels

import (
	"errors"
	"fmt"

	"gorm.io/gorm"
)

type Devices struct {
	gorm.Model
	SerialNumber string `gorm:"type:varchar(255);not null;unique;" json:"serial_number"`
	Name         string `gorm:"type:varchar(255);not null;" json:"name"`
	IPAddress    string `gorm:"type:varchar(255);not null;unique;" json:"ip_address"`
	Port         int    `gorm:"not null;" json:"port"`
	Location     string `gorm:"type:varchar(255);not null;" json:"location"`
}

// Validate checks that the Port is within the valid range
func (d *Devices) ValidateDevice(db *gorm.DB) error {
	if d.SerialNumber == "" {
		return errors.New("serial number is required")
	}
	if d.Name == "" {
		return errors.New("name is required")
	}
	if d.IPAddress == "" {
		return errors.New("ip address is required")
	}
	if d.Location == "" {
		return errors.New("location is required")
	}
	if d.Port == 0 {
		return errors.New("port is required")
	}
	if d.Port < 0 || d.Port > 65535 {
		return errors.New("port must be between 0 and 65535")
	}
	var count int64
	if err := db.Model(&Devices{}).Where("serial_number = ? AND deleted_at IS NULL", d.SerialNumber).Count(&count).Error; err != nil {
		return fmt.Errorf("error checking serial number uniqueness: %v", err)
	}
	if count > 0 {
		return fmt.Errorf("serial number must be unique: %s", d.SerialNumber)
	}

	if err := db.Model(&Devices{}).Where("ip_address = ? AND deleted_at IS NULL", d.IPAddress).Count(&count).Error; err != nil {
		return fmt.Errorf("error checking ip address uniqueness: %v", err)
	}
	if count > 0 {
		return fmt.Errorf("ip address must be unique: %s", d.IPAddress)
	}
	return nil
}

func (d *Devices) ValidateDeviceForUpdate(db *gorm.DB, currentID ...uint) error {
	if d.SerialNumber == "" {
		return errors.New("serial number is required")
	}
	if d.Name == "" {
		return errors.New("name is required")
	}
	if d.IPAddress == "" {
		return errors.New("ip address is required")
	}
	if d.Location == "" {
		return errors.New("location is required")
	}
	if d.Port == 0 {
		return errors.New("port is required")
	}
	if d.Port < 0 || d.Port > 65535 {
		return errors.New("port must be between 0 and 65535")
	}
	var count int64
	if err := db.Model(&Devices{}).Where("serial_number = ? AND id != ? AND deleted_at IS NULL", d.SerialNumber, currentID).Count(&count).Error; err != nil {
		return fmt.Errorf("error checking serial number uniqueness: %v", err)
	}
	if count > 0 {
		return fmt.Errorf("serial number must be unique: %s", d.SerialNumber)
	}

	if err := db.Model(&Devices{}).Where("ip_address = ? AND id != ? AND deleted_at IS NULL", d.IPAddress, currentID).Count(&count).Error; err != nil {
		return fmt.Errorf("error checking ip address uniqueness: %v", err)
	}
	if count > 0 {
		return fmt.Errorf("ip address must be unique: %s", d.IPAddress)
	}
	return nil

}
