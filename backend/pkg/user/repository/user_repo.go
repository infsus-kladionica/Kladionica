package repository

import (
	"github.com/google/uuid"

	"github.com/infsus-kladionica/Kladionica/backend/pkg/database"
	"github.com/infsus-kladionica/Kladionica/backend/pkg/models"
)

func AddUser(inputUser *models.Korisnik) (string, error) {
	sqlTxt := `
		INSERT INTO inputUser (id, korisnicko_ime, saldo, sifra, je_admin)
		VALUES ($1, $2, $3, $4)
		`

	inputUser.ID = uuid.New().String()
	_, err := database.DB.Exec(sqlTxt, inputUser.ID, inputUser.Korisnicko_ime, 0, inputUser.Sifra, false)
	return inputUser.ID, err
}

func CheckUser(inputUser *models.Korisnik) (string, error) {
	var id string
	row := database.DB.QueryRow("SELECT id FROM inputUser WHERE korisnicko_ime = $1 AND sifra = $2", inputUser.Korisnicko_ime, inputUser.Sifra)
	err := row.Scan(&id)
	if err != nil {
		return "", err
	}

	return id, err
}
