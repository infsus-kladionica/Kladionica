import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";

import EventService from "../services/EventService";
import IDogadaj from "../types/Dogadaj";

export default function Home() {
    const [events, setEvents] = useState<IDogadaj[]>([]);
    useEffect(() => {
        const getNext10Events = async () => {
            await EventService.getNext10Events().then((response) => {
                setEvents(response)
            });
        };
        getNext10Events();
    }, []);

    return (
    <div>
      Evo me na Homeu
    </div>
  );
};