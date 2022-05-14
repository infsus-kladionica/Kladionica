package repository

import (
	"time"

	"github.com/infsus-kladionica/Kladionica/backend/pkg/database"
	"github.com/infsus-kladionica/Kladionica/backend/pkg/models"
)

func DohvatiPonuduDana(dan time.Time) ([]models.Ponuda, error) {
	var ponudaZaVratit []models.Ponuda
	start := dan
	kraj1 := dan.Add(23 * time.Hour)
	kraj2 := kraj1.Add(59 * time.Minute)

	var dogadaji []models.Dogadaj
	row := database.DB.QueryRow("SELECT * FROM dogadaj WHERE vrijeme_pocetka > ? AND vrijeme_pocetka <= ?", start, kraj2)
	err := row.Scan(&dogadaji)
	if err != nil {
		return []models.Ponuda{}, err
	}

	for _, elem := range dogadaji {
		var ponudaSaJednogEventa []models.Ponuda
		row := database.DB.QueryRow("SELECT * FROM ponuda WHERE dogadaj_id = ?", elem.ID)
		err := row.Scan(&ponudaSaJednogEventa)
		if err != nil {
			return []models.Ponuda{}, err
		}

		for _, elem2 := range ponudaSaJednogEventa {
			ponudaZaVratit = append(ponudaZaVratit, elem2)
		}
	}

	return ponudaZaVratit, nil
}
