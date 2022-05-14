package service

import (
	"github.com/infsus-kladionica/Kladionica/backend/pkg/event/repository"
	"github.com/infsus-kladionica/Kladionica/backend/pkg/models"
)

func DohvatiDogadaje() ([]models.Dogadaj, error) {
	return repository.DohvatiDogadaje()
}
