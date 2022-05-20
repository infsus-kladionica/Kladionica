import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { ListGroup, Button } from "react-bootstrap";

import { useLocalStorage } from "../common/useLocalStorage";
import {IOddList, IOdd, emptyOdd} from "../types/Event"

interface ITicketProps {
    odds: IOddList,
    updateOdds: (arg: IOddList) => void
};

const Ticket: React.FC<ITicketProps> = ({odds, updateOdds}) => {
    useEffect(() => {
       console.log("UseEffect")
    }, [odds]);
    console.log("Ticket " + odds)

    return (
    <div>
        <ListGroup>
            {odds.odds.map((odd: IOdd) => (
                <ListGroup.Item key={odd.id}>
                    <div>
                        <span>{odd.naziv}</span>
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    </div>
  );
};

export default Ticket;