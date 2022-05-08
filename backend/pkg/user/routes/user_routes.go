package routes

import (
	"github.com/kladionica/backend/pkg/user/handlers"

	"github.com/gin-gonic/gin"
)

func UserRouter(router *gin.RouterGroup) {
	//router.POST("/register", handlers.Register())
	router.POST("/registriraj", handlers.RegistrirajKrosnika())

	// test
	router.GET("/ping", handlers.Ping())
}
