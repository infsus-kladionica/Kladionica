package repository

import (
	"github.com/kladionica/backend/pkg/database"
	"github.com/kladionica/backend/pkg/models"
)

func DodajKorisnika(korisnik *models.Korisnik) error {
	sqlTekst := `
		INSERT INTO kladionica.korisnik (id, korisnicko_ime, saldo, sifra)
		VALUES ($1, $2, $3, $4)
		`

	_, err := database.DB.Exec(sqlTekst, korisnik.ID, korisnik.Korisnicko_ime, 0, korisnik.Sifra)
	return err
}
