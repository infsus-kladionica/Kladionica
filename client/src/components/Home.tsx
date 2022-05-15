import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { Container, Form, ListGroup } from "react-bootstrap";

import {IEvent, IEventList} from "../types/Event"

import EventService from "../services/EventService";

const EventList: React.FC<IEventList> = (events: IEventList) => {
    const navigate = useNavigate();
    const handleClick = (event_id: string) => {
        navigate(`/event/${event_id}`)
    }

    return (
        <div>
            <ListGroup>
                {events.events.map((event: IEvent) => (
                    <ListGroup.Item key={event.id} onClick={() => handleClick(event.id)}>
                        <div>
                            <span>{event.naziv}</span>
                            <span>{event.vrijeme_pocetka}</span>
                            <span>{event.sport}</span>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

const Home: React.FC = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [loader, setLoader] = useState<Boolean>(true);
    useEffect(() => {
        const getNext10Events = async () => {
            await EventService.getNext10Events().then((response) => {
                let data: IEvent[] = response.data
                setEvents(data)
                setLoader(false)
            });
        };
        getNext10Events();
    }, []);

    return (
    <div>
        {loader ?
            (
                <>Loading events...</>
            )
            :
            (
                <EventList events={events}/>
            )
        }
    </div>
  );
};

export default Home;