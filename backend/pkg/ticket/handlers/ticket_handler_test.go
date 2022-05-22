package handlers

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/infsus-kladionica/Kladionica/backend/pkg/database"
	"github.com/infsus-kladionica/Kladionica/backend/pkg/models"
	"github.com/infsus-kladionica/Kladionica/backend/pkg/ticket/service"
)

func TestPlaceTicket(t *testing.T) {
	resp := PlaceTicket()
	assert.NotNil(t, resp)

	// no error in running database
	err := database.Pokreni()
	assert.NoError(t, err)

	// user i ishod postoje u bazi
	testTicket := models.Listic{
		Korisnik_id: "74a4fcae-47a3-4048-8293-3c59673272a7",
		Uplata:      10,
		Ishodi: []models.Ishod{
			{ID: "12ab35f3-9407-438e-b3a4-f00cd44fb4f4"},
		},
	}

	err = service.AddTicket(testTicket)
	assert.NoError(t, err)

	// user i ishodi ne postoje u bazi
	testTicket = models.Listic{
		Korisnik_id: "krivi Id",
		Uplata:      10,
		Ishodi: []models.Ishod{
			{ID: "Krivi id"},
		},
	}

	err = service.AddTicket(testTicket)
	assert.Error(t, err)
}

func TestGetUserTickets(t *testing.T) {
	resp := GetUserTickets()
	assert.NotNil(t, resp)

	// GetUserTickets is the only function used in this request type
	_, err := service.GetUserTickets("testId")
	assert.NoError(t, err)
}
