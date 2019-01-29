package router

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/muiscript/todo-go-react/db"
	"github.com/muiscript/todo-go-react/model"
	"net/http"
)

func getTodos(ctx *gin.Context) {
	var todos []model.Todo
	db.DB.Find(&todos)

	ctx.JSON(http.StatusOK, todos)
}

func createTodo(ctx *gin.Context) {
	var todo model.Todo

	if err := ctx.ShouldBind(&todo); err != nil {
		fmt.Println(err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.DB.Create(&todo)

	ctx.JSON(http.StatusOK, todo)
}

func completeTodo(ctx *gin.Context) {
	var todo model.Todo

	id := ctx.Param("id")
	if err := db.DB.First(&todo, id).Error; err != nil {
		fmt.Println(err)
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	todo.Completed = !todo.Completed
	db.DB.Save(&todo)

	ctx.JSON(http.StatusOK, todo)
}
