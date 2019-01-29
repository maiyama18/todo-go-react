package main

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/muiscript/todo-go-react/db"
	"github.com/muiscript/todo-go-react/router"
)

func main() {
	if err := db.Init(); err != nil {
		panic(err)
	}
	defer db.CloseDB()

	r := router.New()
	if err := r.Run(":4000"); err != nil {
		panic(err)
	}
}
