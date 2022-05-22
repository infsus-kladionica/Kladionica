import http from "../common/http-common";
import { IOdd } from "../types/Event";
import { ITicket, IUserTicket } from "../types/Ticket";

const placeTicket = (data: ITicket) => {
  return http.post<ITicket>("/ticket/place", data);
};

const getUserTickets = (user_id: string) => {
  return http.get<IUserTicket[]>(`/ticket/get-by-user/${user_id}`);
};

const TicketService = {
    placeTicket,
    getUserTickets
};

export default TicketService;