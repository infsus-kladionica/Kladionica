import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { Container, Form, ListGroup } from "react-bootstrap";

import {emptyEvent, IEvent, IEventList, emptyEventList} from "../types/Event"

import EventService from "../services/EventService";

type HomeProps = {
    updateEvent: (arg: IEvent) => void
};

type EventListProps = {
    events: IEventList
    updateEvent: (arg: IEvent) => void
};

const EventList: React.FC<EventListProps> = (props) => {
    const navigate = useNavigate();
    const handleClick = (event: IEvent) => {
        props.updateEvent(event)
        navigate(`/event/${event.id}`)
    }

    return (
        <div>
            <ListGroup>
                {props.events.events.map((event: IEvent) => (
                    <ListGroup.Item key={event.id} onClick={() => handleClick(event)}>
                        <div>
                            <span>{event.naziv} </span>
                            <span>{event.vrijeme_pocetka} </span>
                            <span>{event.sport}</span>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

const Home: React.FC<HomeProps> = (props) => {
    const [events, setEvents] = useState<IEventList>(emptyEventList);
    const [loader, setLoader] = useState<Boolean>(true);
    useEffect(() => {
        props.updateEvent(emptyEvent)
        const getNext10Events = async () => {
            await EventService.getNext10Events().then((response) => {
                let data: IEventList = ({
                    events: response.data
                })
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
                <EventList events={events} updateEvent={props.updateEvent}/>
            )
        }
    </div>
  );
};

export default Home;