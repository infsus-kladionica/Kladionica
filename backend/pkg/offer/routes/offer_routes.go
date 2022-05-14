package routes

import (
	"github.com/gin-gonic/gin"

	"github.com/infsus-kladionica/Kladionica/backend/pkg/offer/handlers"
)

func OfferRouter(router *gin.RouterGroup) {
	//router.POST("/register", handlers.Register())
	router.GET("/ponuda-po-danu/:dan", handlers.DohvatiPonuduDana())
	// router.GET("/ponuda-po-dogadaju/:dogadajID", handlers.DohvatiPonuduPoDogadaju())

}
