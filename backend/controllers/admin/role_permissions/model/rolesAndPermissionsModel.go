package model

type Roles struct {
	Id          int    `gorm:"type:int;primary_key"`
	Name        string `gorm:"type:varchar(255)"`
	Description string `gorm:"type:varchar(255)"`
}

type Permissions struct {
	Id          int    `gorm:"type:int;primary_key"`
	Name        string `gorm:"type:varchar(255)"`
	Description string `gorm:"type:varchar(255)"`
}
