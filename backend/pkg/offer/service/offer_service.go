package service

import (
	"time"

	"github.com/infsus-kladionica/Kladionica/backend/pkg/models"
	"github.com/infsus-kladionica/Kladionica/backend/pkg/offer/repository"
)

func DohvatiPonuduDana(dan time.Time) ([]models.Ponuda, error) {
	return repository.DohvatiPonuduDana(dan)
}
