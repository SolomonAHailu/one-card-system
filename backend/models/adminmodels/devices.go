package adminmodels

import (
	"gorm.io/gorm"
)

type Devices struct {
	gorm.Model
	SerialNumber string `gorm:"type:varchar(255);not null;unique;" json:"serial_number"` // Unique identifier
	Name         string `gorm:"type:varchar(255);not null;" json:"name"`
	IPAddress    string `gorm:"type:varchar(255);not null;" json:"ip_address"`
	Port         int    `gorm:"not null;" json:"port"`
	Location     string `gorm:"type:varchar(255);not null;" json:"Location"`
	// LocationID   *int   `gorm:"default:null;" json:"location_id"`                    // Nullable foreign key ID
	// LocationType string `gorm:"type:varchar(50);default:null;" json:"location_type"` // Type of the location (e.g., "Cafeteria", "Library")

	// // Polymorphic relationship
	// Location interface{} `gorm:"-" json:"location"` // Interface for the actual location model
}
