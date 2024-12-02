package registrarmodels

import (
	"fmt"
	"time"

	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
	"github.com/SolomonAHailu/one-card-system/models/cafeteriamodels"
	"github.com/SolomonAHailu/one-card-system/models/dormitorymodels"
	"github.com/SolomonAHailu/one-card-system/models/librarymodels"
	"gorm.io/gorm"
)

type SexType string
type StatusType string

const (
	SexMale   SexType = "Male"
	SexFemale SexType = "Female"
)

const (
	StatusActive   StatusType = "Active"
	StatusInactive StatusType = "Inactive"
)

type Student struct {
	gorm.Model
	StudentID         string                      `gorm:"type:varchar(255);not null;index" json:"student_id"`
	CardNumber        *string                     `gorm:"type:varchar(255);default:NULL;uniqueIndex" json:"card_number"`
	FirstName         string                      `gorm:"type:varchar(255);not null" json:"first_name"`
	FatherName        string                      `gorm:"type:varchar(255);not null" json:"father_name"`
	GrandFatherName   string                      `gorm:"type:varchar(255);not null" json:"grand_father_name"`
	Email             string                      `gorm:"type:varchar(255);not null;uniqueIndex" json:"email"`
	Phone             string                      `gorm:"type:varchar(255);not null" json:"phone"`
	Sex               SexType                     `gorm:"type:varchar(50);not null" json:"sex"`
	DateOfBirth       time.Time                   `gorm:"type:date;not null" json:"date_of_birth"`
	Program           string                      `gorm:"type:varchar(255);not null" json:"program"`
	Section           string                      `gorm:"type:varchar(255);not null" json:"section"`
	Year              int                         `gorm:"type:int;not null" json:"year"`
	Semester          int                         `gorm:"type:int;not null" json:"semester"`
	Religion          string                      `gorm:"type:varchar(255)" json:"religion"`
	Photo             *string                     `gorm:"type:text;default:NULL" json:"photo"`
	LibraryID         *int                        `gorm:"type:int;null" json:"library_id"`
	LibraryAssigned   librarymodels.Libraries     `gorm:"foreignKey:LibraryID;references:ID" json:"library_assigned"`
	CafeteriaID       *int                        `gorm:"type:int;null" json:"cafeteria_id"`
	CafeteriaAssigned cafeteriamodels.Cafeterias  `gorm:"foreignKey:CafeteriaID;references:ID" json:"cafeteria_assigned"`
	DormitoryID       *int                        `gorm:"type:int;null" json:"dormitory_id"`
	DormitoryAssigned dormitorymodels.Dormitories `gorm:"foreignKey:DormitoryID;references:ID" json:"dormitory_assigned"`
	RegisteredByID    *int                        `gorm:"type:int;null" json:"registered_by_id"`
	RegisteredBy      adminmodels.Users           `gorm:"foreignKey:RegisteredByID;references:ID" json:"registered_by"`
	RegisteredDate    time.Time                   `gorm:"type:date;not null" json:"registered_date"`
	Status            StatusType                  `gorm:"type:varchar(50);not null" json:"status"`
}

func (s *Student) Validate() error {
	if s.Sex != SexMale && s.Sex != SexFemale {
		return fmt.Errorf("invalid sex value: %s", s.Sex)
	}
	if s.Status != StatusActive && s.Status != StatusInactive {
		return fmt.Errorf("invalid status value: %s", s.Status)
	}
	return nil
}
