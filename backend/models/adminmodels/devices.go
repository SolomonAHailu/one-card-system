package adminmodels

import (
	"errors"

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
func (d *Devices) Validate() error {
	if d.Port < 0 || d.Port > 65535 {
		return errors.New("port must be between 0 and 65535")
	}
	return nil
}
