import http from "../common/http-common";
import {IEvent, IMarket, IOdd} from "../types/Event";

const getNext10Events = () => {
  return http.get<IEvent[]>("/event/next-10");
};

const getMarkets = (event_id: string) => {
  return http.get<IMarket[]>(`/event/${event_id}/markets`);
};

const changeOdd = (odd: IOdd) => {
  return http.patch<IOdd>("event/change-odd", odd)
};

const EventService = {
    getNext10Events,
    getMarkets,
    changeOdd
};

export default EventService;