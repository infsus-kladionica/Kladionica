package service

import (
	"github.com/infsus-kladionica/Kladionica/backend/pkg/event/repository"
	"github.com/infsus-kladionica/Kladionica/backend/pkg/models"
)

func DohvatiDogadaje() ([]models.DogadajResponse, error) {
	return repository.DohvatiDogadaje()
}

func GetEventMarkets(id string) ([]models.MarketResponse, error) {
	return repository.GetEventMarkets(id)
}
