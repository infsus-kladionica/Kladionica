package routes

import (
	"github.com/gin-gonic/gin"

	"github.com/infsus-kladionica/Kladionica/backend/pkg/ticket/handlers"
)

func TicketRouter(router *gin.RouterGroup) {
	router.POST("/place", handlers.PlaceTicket())
	router.GET("/get-by-user/:userId", handlers.GetUserTickets())
}
