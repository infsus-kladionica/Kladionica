package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/infsus-kladionica/Kladionica/backend/pkg/event/service"
)

func GetEvents() gin.HandlerFunc {
	return func(c *gin.Context) {
		events, err := service.GetEvents()
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err})
			return
		}

		c.JSON(http.StatusOK, events)
	}
}

func GetEventMarkets() gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		markets, err := service.GetEventMarkets(id)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err})
			return
		}

		c.JSON(http.StatusOK, markets)
	}
}
