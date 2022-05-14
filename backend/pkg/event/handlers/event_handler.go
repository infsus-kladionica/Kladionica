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

		c.JSON(http.StatusOK, gin.H{
			"data": dogadaji,
		})
	}
}
