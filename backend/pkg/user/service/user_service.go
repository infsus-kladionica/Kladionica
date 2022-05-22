package service

import (
	"github.com/infsus-kladionica/Kladionica/backend/pkg/models"
	"github.com/infsus-kladionica/Kladionica/backend/pkg/user/repository"
)

func AddUser(inputUser *models.Korisnik) (string, error) {
	userID, err := repository.AddUser(inputUser)
	return userID, err
}

func LoginUser(inputUser *models.Korisnik) (string, error) {
	return repository.CheckUser(inputUser)
}
