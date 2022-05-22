import {IOdd, IOddMarket} from './Event';

export interface ITicket {
    id?: string,
    korisnik_id?: string,
    uplata: number,
    ishodi: IOdd[]
};

export interface IUserTicket {
    id: string,
    won: number,
    odd_markets: IOddMarket[]
}

export const emptyUserTicket: IUserTicket = ({
    id: "",
    won: 0,
    odd_markets: []
});

export interface IUserTicketList {
    userTickets: IUserTicket[]
}

export const emptyUserTicketList: IUserTicketList = ({
    userTickets: []
});