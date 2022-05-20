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

func GetUserTickets(userID string) ([]models.UserTicketResponse, error) {
	var tickets []models.UserTicketResponse

	return tickets, nil
}
