package service

import (
	"github.com/infsus-kladionica/Kladionica/backend/pkg/models"
	"github.com/infsus-kladionica/Kladionica/backend/pkg/ticket/repository"
)

func AddTicket(ticket models.Listic) error {
	return repository.AddTicket(ticket)
}

func GetUserTickets(userID string) ([]models.UserTicketResponse, error) {
	return repository.GetUserTickets(userID)
}
