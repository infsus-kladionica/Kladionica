package routes

import (
	"github.com/gin-gonic/gin"

	"github.com/infsus-kladionica/Kladionica/backend/pkg/event/handlers"
)

func DogadajiRouter(router *gin.RouterGroup) {
	//router.POST("/register", handlers.Register())
	router.GET("/next-10", handlers.GetEvents())
	router.GET("/:id/markets", handlers.GetEventMarkets())
	// router.GET("/ponuda-po-dogadaju/:dogadajID", handlers.DohvatiPonuduPoDogadaju())

}
