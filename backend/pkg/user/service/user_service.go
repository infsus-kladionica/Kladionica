package service

import (
	"github.com/kladionica/backend/pkg/models"
	"github.com/kladionica/backend/pkg/user/repository"
)

func DodajKorisnika(korisnik *models.Korisnik) error {
	err := repository.DodajKorisnika(korisnik)
	return err
}
