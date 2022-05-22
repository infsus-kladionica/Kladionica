package repository

import (
	"github.com/google/uuid"

	"github.com/infsus-kladionica/Kladionica/backend/pkg/database"
	"github.com/infsus-kladionica/Kladionica/backend/pkg/models"
)

func DodajKorisnika(korisnik *models.Korisnik) (string, error) {
	sqlTekst := `
		INSERT INTO korisnik (id, korisnicko_ime, saldo, sifra, je_admin)
		VALUES ($1, $2, $3, $4)
		`

	korisnik.ID = uuid.New().String()
	_, err := database.DB.Exec(sqlTekst, korisnik.ID, korisnik.Korisnicko_ime, 0, korisnik.Sifra, false)
	return korisnik.ID, err
}

func ProvjeriKorisnika(korisnik *models.Korisnik) (string, error) {
	var id string
	row := database.DB.QueryRow("SELECT id FROM korisnik WHERE korisnicko_ime = $1 AND sifra = $2", korisnik.Korisnicko_ime, korisnik.Sifra)
	err := row.Scan(&id)
	if err != nil {
		return "", err
	}

	return id, err
}
