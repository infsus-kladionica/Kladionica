package repository

import (
	"time"

	"github.com/infsus-kladionica/Kladionica/backend/pkg/database"
	"github.com/infsus-kladionica/Kladionica/backend/pkg/models"
)

func DohvatiDogadaje() ([]models.Dogadaj, error) {
	sad := time.Now()
	var dogadaji []models.Dogadaj
	rows, err := database.DB.Query("SELECT * FROM dogadaj WHERE vrijeme_pocetka > $1 ORDER BY vrijeme_pocetka ASC LIMIT 10", sad)
	if err != nil {
		return dogadaji, err
	}
	defer rows.Close()
	for rows.Next() {
		var dogadaj models.Dogadaj
		err := rows.Scan(&dogadaj)
		if err != nil {
			return []models.Dogadaj{}, err
		}
		dogadaji = append(dogadaji, dogadaj)
	}

	return dogadaji, nil
}
