package repository

import (
	"math"
	"time"

	"github.com/infsus-kladionica/Kladionica/backend/pkg/database"
	"github.com/infsus-kladionica/Kladionica/backend/pkg/models"
)

func GetEvents() ([]models.DogadajResponse, error) {
	now := time.Now()
	var eventsVar []models.DogadajResponse
	rows, err := database.DB.Query("SELECT dogadaj.id, dogadaj.naziv, dogadaj.vrijeme_pocetka, sport.ime, domacin.ime, gost.ime FROM dogadaj JOIN sport ON dogadaj.sport_id = sport.id JOIN natjecatelj AS domacin ON dogadaj.domacin_id = domacin.id JOIN natjecatelj AS gost ON dogadaj.gost_id = gost.id  WHERE dogadaj.vrijeme_pocetka > $1 ORDER BY dogadaj.vrijeme_pocetka ASC LIMIT 10", now)
	if err != nil {
		return eventsVar, err
	}
	defer rows.Close()
	for rows.Next() {
		var eventVar models.DogadajResponse
		err := rows.Scan(&eventVar.ID, &eventVar.Naziv, &eventVar.Vrijeme_pocetka, &eventVar.Sport, &eventVar.Domacin, &eventVar.Gost)
		if err != nil {
			return []models.DogadajResponse{}, err
		}
		eventsVar = append(eventsVar, eventVar)
	}

	return eventsVar, nil
}

func GetEventMarkets(id string) ([]models.MarketResponse, error) {
	var markets []models.MarketResponse
	rows, err := database.DB.Query("SELECT ponuda.id, ponuda.naziv, ponuda.marza FROM dogadaj JOIN ponuda ON dogadaj.id = ponuda.dogadaj_id WHERE dogadaj.id = $1", id)
	if err != nil {
		return markets, err
	}
	defer rows.Close()
	for rows.Next() {
		var market models.MarketResponse
		var margin int
		err := rows.Scan(&market.ID, &market.Naziv, &margin)
		if err != nil {
			return []models.MarketResponse{}, err
		}
		odds, err := GetMarketOdds(market.ID, margin)
		if err != nil {
			return []models.MarketResponse{}, err
		}
		market.Ishodi = odds
		markets = append(markets, market)
	}

	return markets, nil
}

func GetMarketOdds(id string, margin int) ([]models.OddResponse, error) {
	var odds []models.OddResponse
	after_margin := 1 - (float64(margin) / 100.0)
	rows, err := database.DB.Query("SELECT ishod.id, ishod.naziv, ishod.koeficijent AS koeficijent FROM ponuda JOIN ishod ON ponuda.id = ishod.ponuda_id WHERE ponuda.id = $1", id)
	if err != nil {
		return odds, err
	}
	defer rows.Close()
	for rows.Next() {
		var odd models.OddResponse
		var temp_koef float64
		err := rows.Scan(&odd.ID, &odd.Naziv, &temp_koef)
		if err != nil {
			return []models.OddResponse{}, err
		}
		koef := math.Round(temp_koef*after_margin*100) / 100
		odd.Koeficijet = koef
		odds = append(odds, odd)
	}

	return odds, nil
}

func ChangeOdd(odd models.Ishod) (error) {
	sqlTekst := `
		UPDATE ishod SET koeficijent = $1
			WHERE id = $2;
		`

	_, err := database.DB.Exec(sqlTekst, odd.Koeficijent, odd.ID)
	return err
}
