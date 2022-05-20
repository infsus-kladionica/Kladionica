package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/infsus-kladionica/Kladionica/backend/pkg/models"
	"github.com/infsus-kladionica/Kladionica/backend/pkg/ticket/service"
)

func PlaceTicket() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ticket models.Listic
		err := json.NewDecoder(c.Request.Body).Decode(&ticket)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "iz inputa neuspješno decodean lisitć"})
			return
		}

		insertErr := service.AddTicket(ticket)
		if insertErr != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Listić nije uspješno kreiran"})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"data": ticket,
		})
	}
}

func GetUserTickets() gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.Param("userId")
		tickets, err := service.GetUserTickets(userID)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err})
			return
		}

		c.JSON(http.StatusOK, tickets)
	}
}
