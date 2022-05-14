package routes

import (
	"github.com/infsus-kladionica/Kladionica/backend/pkg/user/handlers"

	"github.com/gin-gonic/gin"
)

func UserRouter(router *gin.RouterGroup) {
	//router.POST("/register", handlers.Register())
	router.POST("/registriraj", handlers.RegistrirajKorisnika())
	router.POST("/prijava", handlers.PrijavaKorisnik())

	// test
	router.GET("/ping", handlers.Ping())
}
