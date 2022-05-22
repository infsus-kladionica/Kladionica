package repository

import (
	"github.com/google/uuid"

	"github.com/infsus-kladionica/Kladionica/backend/pkg/database"
	"github.com/infsus-kladionica/Kladionica/backend/pkg/models"
)

func AddTicket(ticket models.Listic) error {
	sqlTekst := `
		INSERT INTO listic(id, korisnik_id, uplata)
		VALUES ($1, $2, $3)
		`

	ticket.ID = uuid.New().String()
	_, err := database.DB.Exec(sqlTekst, ticket.ID, ticket.Korisnik_id, ticket.Uplata)
	if err != nil {
		return err
	}

	sqlTekst = `
		INSERT INTO listic_ishod(listic_id, ishod_id)
		VALUES ($1, $2)
		`
	for _, elem := range ticket.Ishodi {
		_, err := database.DB.Exec(sqlTekst, ticket.ID, elem.ID)
		if err != nil {
			return err
		}
	}

	return nil
}

func GetTicketOddMarkets(ticketID string) ([]models.OddMarket, error) {
	var oddMarkets []models.OddMarket

	sqlTekst := `
		SELECT listic_ishod.ishod_id, ishod.naziv, ponuda.naziv, dogadaj.naziv, ishod.koeficijent
			FROM listic_ishod JOIN ishod ON listic_ishod.ishod_id = ishod.id
				JOIN ponuda ON ponuda.id = ishod.ponuda_id
				JOIN dogadaj ON dogadaj.id = ponuda.dogadaj_id
			WHERE listic_ishod.listic_id = $1
		`

	rows, err := database.DB.Query(sqlTekst, ticketID)
	if err != nil {
		return oddMarkets, err
	}
	defer rows.Close()
	for rows.Next() {
		var oddMarket models.OddMarket
		err := rows.Scan(&oddMarket.ID, &oddMarket.OddName, &oddMarket.MarketName, &oddMarket.EventName, &oddMarket.Koeficijent)
		if err != nil {
			return []models.OddMarket{}, err
		}
		oddMarkets = append(oddMarkets, oddMarket)
	}

	return oddMarkets, nil
}

func GetUserTickets(userID string) ([]models.UserTicketResponse, error) {
	var tickets []models.UserTicketResponse

	sqlTekst := `
			SELECT listic.id 
				FROM listic JOIN korisnik ON korisnik.id = listic.korisnik_id
				WHERE listic.korisnik_id = $1
		`

	rows, err := database.DB.Query(sqlTekst, userID)
	if err != nil {
		return tickets, err
	}
	defer rows.Close()
	for rows.Next() {
		var ticket models.UserTicketResponse
		err := rows.Scan(&ticket.TicketID)
		if err != nil {
			return []models.UserTicketResponse{}, err
		}
		oddMarkets, err := GetTicketOddMarkets(ticket.TicketID)
		if err != nil {
			return []models.UserTicketResponse{}, err
		}
		ticket.OddMarkets = oddMarkets
		tickets = append(tickets, ticket)
	}

	return tickets, nil
}
