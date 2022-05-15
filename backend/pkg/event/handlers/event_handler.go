package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/infsus-kladionica/Kladionica/backend/pkg/event/service"
)

func DohvatiDogadaje() gin.HandlerFunc {
	return func(c *gin.Context) {
		dogadaji, err := service.DohvatiDogadaje()
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err})
			return
		}

		c.JSON(http.StatusOK, dogadaji)
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
