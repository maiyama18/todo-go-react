package db

import (
	"github.com/jinzhu/gorm"
	"github.com/muiscript/todo-go-react/model"
)

var DB *gorm.DB

func Init() error {
	var err error
	DB, err = gorm.Open("mysql", "root:@/playground?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		return err
	}

	DB.DropTableIfExists(&model.Todo{})
	DB.CreateTable(&model.Todo{})
	insertFixtures()

	return nil
}

func CloseDB() {
	DB.Close()
}

func insertFixtures() {
	fixtureTodos := []model.Todo{
		{Title: "Practice Programming"},
		{Title: "Read the Book"},
		{Title: "Go to Office"},
	}

	for _, todo := range fixtureTodos {
		DB.Create(&todo)
	}
}

