package handlers

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/infsus-kladionica/Kladionica/backend/pkg/database"
	"github.com/infsus-kladionica/Kladionica/backend/pkg/event/service"
)

func TestGetEvents(t *testing.T) {
	resp := GetEventMarkets()
	assert.NotNil(t, resp)

	database.Pokreni()

	// GetUserTickets is the only function used in this request type
	_, err := service.GetEvents()
	assert.NoError(t, err)
}

func TestGetMarkets(t *testing.T) {
	resp := GetEventMarkets()
	assert.NotNil(t, resp)

	database.Pokreni()

	// GetUserTickets is the only function used in this request type
	_, err := service.GetEventMarkets("Smije postojat event s 0 marketa pa se nikad ne vrati error")
	assert.NoError(t, err)
}
