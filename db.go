package main

import "github.com/jinzhu/gorm"

func InitDB() (*gorm.DB, error) {
	db, err := gorm.Open("mysql", "root:@/playground?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		return nil, err
	}

	db.DropTableIfExists(&Todo{})
	db.CreateTable(&Todo{})
	insertFixtures(db)

	return db, nil
}

func insertFixtures(db *gorm.DB) {
	fixtureTodos := []Todo{
		{Title: "Practice Programming"},
		{Title: "Read the Book"},
		{Title: "Go to Office"},
	}

	for _, todo := range fixtureTodos {
		db.Create(&todo)
	}
}
