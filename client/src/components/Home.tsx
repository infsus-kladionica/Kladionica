import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";

import {IEvent, IEventListProps} from "../types/Event"

import EventService from "../services/EventService";

const EventList: React.FC<IEventListProps> = (events: IEventListProps) => {
    return (
        <div>
            <ul>
            {events.events.map((event: IEvent) => (
                <li key={event.id}>
                    <span>{event.naziv}</span>
                </li>
            ))}
            </ul>
        </div>
    );
};

const Home: React.FC = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    useEffect(() => {
        const getNext10Events = async () => {
            await EventService.getNext10Events().then((response) => {
                setEvents(response.data)
            });
        };
        getNext10Events();
    }, []);

    return (
    <div>
      <EventList events={events}/>
    </div>
  );
};

export default Home;