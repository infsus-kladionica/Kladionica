import http from "../common/http-common";
import IDogadaj from "../types/Dogadaj";

const getNext10Events = () => {
  return http.get<IDogadaj[]>("/event/getNext10Events");
};

const EventService = {
    getNext10Events
};

export default EventService;