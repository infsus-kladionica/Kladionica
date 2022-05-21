import {IOdd} from './Event';

export interface ITicket {
    id?: string,
    korisnik_id?: string,
    uplata: number,
    ishodi: IOdd[]
};