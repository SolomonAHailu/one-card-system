package adminmodels

import (
	"gorm.io/gorm"
)

type Student struct {
	gorm.Model
	FirstName       string `gorm:"type:varchar(255);not null;" json:"first_name"`
	StudentId       string `gorm:"type:varchar(255);not null;" json:"student_id"`
	FatherName      string `gorm:"type:varchar(255);not null;" json:"father_name"`
	GrandFatherName string `gorm:"type:varchar(255);not null;" json:"grand_father_name"`
	Email           string `gorm:"type:varchar(255);not null;" json:"email"`
	Phone           string `gorm:"type:varchar(255);not null;" json:"phone"`
	Program         string `gorm:"type:varchar(255);not null;" json:"program"`
	Section         string `gorm:"type:varchar(255);not null;" json:"section"`
	Year            string `gorm:"type:varchar(255);not null;" json:"year"`
	Semester        string `gorm:"type:varchar(255);not null;" json:"semester"`
	Religion        string `gorm:"type:varchar(255);not null;" json:"religion"`
	Photo           string `gorm:"type:varchar(255);not null;" json:"photo"`
	PhotoUrl        string `gorm:"type:varchar(255);not null;" json:"photoUrl"`
	CaferiaToUse    string `gorm:"type:varchar(255);not null;" json:"caferia_to_use"`
	LibraryToUse    string `gorm:"type:varchar(255);not null;" json:"library_to_use"`
	RegisteredBy    string `gorm:"type:varchar(255);not null;" json:"registered_by"`
	RegisteredDate  string `gorm:"type:varchar(255);not null;" json:"registered_date"`
	Status          string `gorm:"type:varchar(255);not null;" json:"status"`
}
