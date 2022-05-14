package repository

import (
	"github.com/google/uuid"

	"github.com/infsus-kladionica/Kladionica/backend/pkg/database"
	"github.com/infsus-kladionica/Kladionica/backend/pkg/models"
)

func DodajKorisnika(korisnik *models.Korisnik) error {
	sqlTekst := `
		INSERT INTO korisnik (id, korisnicko_ime, saldo, sifra)
		VALUES ($1, $2, $3, $4)
		`

	korisnik.ID = uuid.New().String()
	_, err := database.DB.Exec(sqlTekst, korisnik.ID, korisnik.Korisnicko_ime, 0, korisnik.Sifra)
	return err
}

func ProvjeriKorisnika(korisnik *models.Korisnik) (bool, error) {
	var count int
	row := database.DB.QueryRow("SELECT COUNT(*) FROM korisnik WHERE korisnicko_ime = ? AND sifra = ?", korisnik.Korisnicko_ime, korisnik.Sifra)
	err := row.Scan(&count)
	if err != nil {
		return false, err
	}

	postoji := false
	if count > 0 {
		postoji = true
	}

	return postoji, err
}
