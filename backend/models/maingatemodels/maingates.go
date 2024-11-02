package maingatemodels

import (
	"time"

	"gorm.io/gorm"
)

type MainGates struct {
	gorm.Model
	GateNumber     string    `gorm:"type:varchar(50);not null;" json:"gate_number"`
	Campus         string    `gorm:"type:varchar(100);not null;" json:"campus"`
	BlockNumber    string    `gorm:"type:varchar(50);not null;" json:"block_number"`
	RegisteredBy   string    `gorm:"type:varchar(255);not null;" json:"registered_by"`
	RegisteredDate time.Time `gorm:"not null;" json:"registered_date"`
}
