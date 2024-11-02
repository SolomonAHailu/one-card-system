package cafeteriamodels

import (
	"time"

	"gorm.io/gorm"
)

type Cafeterias struct {
	gorm.Model
	CafeteriaName  string    `gorm:"type:varchar(255);not null" json:"cafeteria_name"`
	Campus         string    `gorm:"type:varchar(255);not null" json:"campus"`
	BlockNumber    string    `gorm:"type:varchar(50)" json:"block_number"`
	RegisteredBy   string    `gorm:"type:varchar(255);not null" json:"registered_by"`
	RegisteredDate time.Time `gorm:"type:datetime;not null" json:"registered_date"`
}
