package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

var sleepTime = 300 * time.Millisecond

func main() {
	db, err := InitDB()
	if err != nil {
		panic(err)
	}
	defer db.Close()

	router := gin.Default()

	router.RedirectTrailingSlash = false
	router.Use(static.Serve("/", static.LocalFile("./js/build", true)))

	router.GET("/api/todos", func(ctx *gin.Context) {
		time.Sleep(sleepTime)
		var todos []Todo
		db.Find(&todos)

		ctx.JSON(http.StatusOK, todos)
	})

	router.POST("/api/todos", func(ctx *gin.Context) {
		time.Sleep(sleepTime)
		var todo Todo

		if err := ctx.ShouldBind(&todo); err != nil {
			fmt.Println(err)
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		db.Create(&todo)

		ctx.JSON(http.StatusOK, todo)
	})

	router.PUT("/api/todos/:id", func(ctx *gin.Context) {
		time.Sleep(sleepTime)
		id := ctx.Param("id")
		var todo Todo
		if err := db.First(&todo, id).Error; err != nil {
			fmt.Println(err)
			ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		todo.Completed = !todo.Completed
		db.Save(&todo)

		ctx.JSON(http.StatusOK, todo)
	})

	router.Run(":4000")
}
