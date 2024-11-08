package librarymodels

import (
	"gorm.io/gorm"
)

type Libraries struct {
	gorm.Model
	LibraryName  string `gorm:"type:varchar(255);not null" json:"library_name"`
	Campus       string `gorm:"type:varchar(255);not null" json:"campus"`
	BlockNumber  string `gorm:"type:varchar(50)" json:"block_number"`
	RegisteredBy string `gorm:"type:varchar(255);not null" json:"registered_by"`
}
