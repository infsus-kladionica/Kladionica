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

func RegisterUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		var user models.Korisnik
		err := json.NewDecoder(c.Request.Body).Decode(&user)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err})
			return
		}

		user.ID, err = service.AddUser(&user)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err})
			return
		}
		c.JSON(http.StatusOK, user)
	}
}

func LoginUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		var inputUser models.Korisnik
		err := json.NewDecoder(c.Request.Body).Decode(&inputUser)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err})
			return
		}

		id, insertErr := service.LoginUser(&inputUser)
		if insertErr != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": insertErr})
			return
		}

		if id == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "User does not exist"})
			return
		}

		inputUser.ID = id

		c.JSON(http.StatusOK, inputUser)
	}
}
