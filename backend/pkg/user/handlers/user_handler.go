package handlers

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/kladionica/backend/pkg/models"
	"github.com/kladionica/backend/pkg/user/service"
	"net/http"
)

var validate = validator.New()

func Ping() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, "Pong")
	}
}

func RegistrirajKorisnika() gin.HandlerFunc {
	return func(c *gin.Context) {
		var user models.Korisnik
		err := json.NewDecoder(c.Request.Body).Decode(&user)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "iz inputa neuspješno decodean korisnik"})
			return
		}

		insertErr := service.DodajKorisnika(&user)
		if insertErr != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Korisnik nije uspješno kreiran"})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"data": user,
		})
	}
}
