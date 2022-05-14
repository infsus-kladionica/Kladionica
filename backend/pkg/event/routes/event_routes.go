package routes

import (
	"github.com/gin-gonic/gin"

	"github.com/infsus-kladionica/Kladionica/backend/pkg/event/handlers"
)

func DogadajiRouter(router *gin.RouterGroup) {
	//router.POST("/register", handlers.Register())
	router.GET("/iducih-10", handlers.DohvatiDogadaje())
	// router.GET("/ponuda-po-dogadaju/:dogadajID", handlers.DohvatiPonuduPoDogadaju())

}
