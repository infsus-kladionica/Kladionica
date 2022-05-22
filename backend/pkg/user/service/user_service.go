package service

import (
	"github.com/infsus-kladionica/Kladionica/backend/pkg/models"
	"github.com/infsus-kladionica/Kladionica/backend/pkg/user/repository"
)

func DodajKorisnika(korisnik *models.Korisnik) (string, error) {
	korisnikID, err := repository.DodajKorisnika(korisnik)
	return korisnikID, err
}

func ProvjeriKorisnika(korisnik *models.Korisnik) (bool, error) {
	return repository.ProvjeriKorisnika(korisnik)
}
