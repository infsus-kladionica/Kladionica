import http from "../common/http-common";
import {IEvent, IMarket} from "../types/Event";

const getNext10Events = () => {
  return http.get<IEvent[]>("/dogadaji/iducih-10");
};

const getMarkets = (event_id: string) => {
  return http.get<IMarket[]>(`/dogadaji/${event_id}/markets`);
};

const EventService = {
    getNext10Events,
    getMarkets
};

export default EventService;