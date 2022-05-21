import http from "../common/http-common";
import { ITicket } from "../types/Ticket";

const placeTicket = (data: ITicket) => {
  return http.post<ITicket>("/ticket/place", data);
};

const TicketService = {
    placeTicket
};

export default TicketService;