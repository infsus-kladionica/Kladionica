package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"

	"github.com/infsus-kladionica/Kladionica/backend/pkg/models"
	"github.com/infsus-kladionica/Kladionica/backend/pkg/user/service"
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

		user.ID, err = service.DodajKorisnika(&user)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Korisnik nije uspješno kreiran"})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"data": user,
		})
	}
}

func PrijavaKorisnik() gin.HandlerFunc {
	return func(c *gin.Context) {
		var korisnik models.Korisnik
		err := json.NewDecoder(c.Request.Body).Decode(&korisnik)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "iz inputa neuspješno decodean korisnik"})
			return
		}

		postoji, insertErr := service.ProvjeriKorisnika(&korisnik)
		if insertErr != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Korisnik nije uspješno kreiran"})
			return
		}

		if postoji == false {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Pogrešna šifra ili korisničko ime"})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": korisnik,
		})
	}
}
