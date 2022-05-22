package service

import (
	"github.com/infsus-kladionica/Kladionica/backend/pkg/event/repository"
	"github.com/infsus-kladionica/Kladionica/backend/pkg/models"
)

func GetEvents() ([]models.DogadajResponse, error) {
	return repository.GetEvents()
}

func GetEventMarkets(id string) ([]models.MarketResponse, error) {
	return repository.GetEventMarkets(id)
}
