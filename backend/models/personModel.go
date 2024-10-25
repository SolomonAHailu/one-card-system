package models

import (
	"gorm.io/gorm"
)

type Person struct {
	gorm.Model
	ID      string   `gorm:"primaryKey;autoIncrement" json:"id"`
	Name    string   `gorm:"type:varchar(255);not null" json:"name"`
	Age     int      `gorm:"not null" json:"age"`
	Hobbies []string `gorm:"type:text[]" json:"hobbies"`
}
