export interface IEvent {
    id?: string,
    naziv: string,
    vrijeme_pocetka: string,
    sport_id?: number,
    domacin_id?: string,
    gost_id?: string,
};

export interface IEventListProps {
    events: IEvent[]
};