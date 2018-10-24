package main

type Todo struct {
	ID        int    `json:"id" gorm:"AUTO_INCREMENT"`
	Title     string `json:"title"`
	Completed bool   `json:"completed" gorm:"default:false"`
}
