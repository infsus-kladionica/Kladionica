export interface IEvent {
    id: string,
    naziv: string,
    vrijeme_pocetka: string,
    sport: number,
    domacin: string,
    gost: string,
};

export interface IEventList {
    events: IEvent[]
};

export type EventParams = {
    id: string
}

export interface IMarket {
    id: string,
    naziv: string
    ishodi: IOdd[]
};

export interface IOdd {
    id: string,
    naziv: string,
    koeficijent: number,
}

export interface IMarketList {
    markets: IMarket[]
};