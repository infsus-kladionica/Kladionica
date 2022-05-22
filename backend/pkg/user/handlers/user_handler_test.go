package handlers

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/infsus-kladionica/Kladionica/backend/pkg/database"
	"github.com/infsus-kladionica/Kladionica/backend/pkg/models"
	"github.com/infsus-kladionica/Kladionica/backend/pkg/ticket/handlers"
	"github.com/infsus-kladionica/Kladionica/backend/pkg/user/service"
)

func TestGetUserTickets(t *testing.T) {
	database.Pokreni()
	resp := handlers.GetUserTickets()
	assert.NotNil(t, resp)

	// exists in test database
	str, err := service.LoginUser(&models.Korisnik{Korisnicko_ime: "dede", Sifra: "dere"})
	assert.NotNil(t, str)
	assert.NoError(t, err)

	// doesn't exists in test database
	_, err = service.LoginUser(&models.Korisnik{Korisnicko_ime: "ne postoji", Sifra: "aa"})
	assert.Error(t, err)
}
