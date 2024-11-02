package dormitorymodels

import (
	"time"

	"gorm.io/gorm"
)

type Dormitories struct {
	gorm.Model
	DormitoryName  string    `gorm:"type:varchar(100);not null;" json:"dormitory_name"`
	Campus         string    `gorm:"type:varchar(100);not null;" json:"campus"`
	BlockNumber    string    `gorm:"type:varchar(50);not null;" json:"block_number"`
	RegisteredBy   string    `gorm:"type:varchar(255);not null;" json:"registered_by"`
	RegisteredDate time.Time `gorm:"not null;" json:"registered_date"`
}
