import http from "../common/http-common";
import {IEvent} from "../types/Event";

const getNext10Events = () => {
  return http.get<IEvent[]>("/event/getNext10Events");
};

const EventService = {
    getNext10Events
};

export default EventService;