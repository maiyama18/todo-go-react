package router

import (
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func New() *gin.Engine {
	r := gin.Default()

	r.RedirectTrailingSlash = false
	r.Use(static.Serve("/", static.LocalFile("./js/build", true)))

	todos := r.Group("/api/todos")
	{
		todos.GET("", getTodos)
		todos.POST("", createTodo)
		todos.PUT("/:id", completeTodo)
	}

	return r
}