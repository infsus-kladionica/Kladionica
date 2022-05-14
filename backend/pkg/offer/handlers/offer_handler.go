package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/infsus-kladionica/Kladionica/backend/pkg/offer/service"
)

func DohvatiPonuduDana() gin.HandlerFunc {
	return func(c *gin.Context) {
		danString := c.Param("dan")
		dan, err := time.Parse("2006-02-01", danString)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Neuspješno parsiranje vremena"})
			return
		}

		ponuda, err := service.DohvatiPonuduDana(dan)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": ponuda,
		})
	}
}
