export interface IEvent {
    id: string,
    naziv: string,
    vrijeme_pocetka: string,
    sport: number,
    domacin: string,
    gost: string,
};

export const emptyEvent: IEvent = ({
    id: "",
    naziv: "",
    vrijeme_pocetka: "",
    sport: 0,
    domacin: "",
    gost: "",
});

export interface IEventList {
    events: IEvent[]
};

export const emptyEventList: IEventList = ({
    events: []
});

export type EventParams = {
    id: string
}

export interface IMarket {
    id: string,
    naziv: string
    ishodi: IOdd[]
};

export const emptyMarket: IMarket = ({
    id: "",
    naziv: "",
    ishodi: []
});

export interface IMarketList {
    markets: IMarket[]
};

export const emptyMarketList: IMarketList = ({
    markets: [],
});

export interface IOdd {
    id: string,
    ponuda_id?: string,
    naziv: string,
    koeficijent: number,
    dobitan?: boolean
};

export const emptyOdd: IOdd = ({
    id: "",
    naziv: "",
    koeficijent: 0,
});

export interface IOddList {
    odds: IOdd[]
};

export const emptyOddList: IOddList = ({
    odds: []
});

export interface ITicketOdd {
    odd: IOdd,
    market: IMarket,
    event: IEvent
};

export const emptyTicketOdd: ITicketOdd = ({
    odd: emptyOdd,
    market: emptyMarket,
    event: emptyEvent
});

export interface ITicketOddList {
    odds: ITicketOdd[]
};

export const emptyTicketOddList: ITicketOddList = ({
    odds: []
});

export interface IOddMarket {
    id: string,
    odd_name: string,
    market_name: string,
    event_name: string,
    koeficijent: number
}

export const emptyOddMarket: IOddMarket = ({
    id: "",
    odd_name: "",
    market_name: "",
    event_name: "",
    koeficijent: 0,
});