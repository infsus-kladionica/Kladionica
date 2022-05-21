import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { ListGroup, Button, Form } from "react-bootstrap";

import TicketService from "../services/TicketService";
import {IOdd, ITicketOddList, ITicketOdd, emptyTicketOddList} from "../types/Event"
import {ITicket} from "../types/Ticket"
import {IUser} from "../types/User"

interface ITicketProps {
    user: IUser
    ticketOdds: ITicketOddList,
    updateOdds: (arg: ITicketOddList) => void
};

const Ticket: React.FC<ITicketProps> = (props) => {
    const [amount, setAmount] = useState<number>(5);

    useEffect(() => {
       console.log("UseEffect")
    }, [props.ticketOdds]);
    console.log("Ticket " + props.ticketOdds)

    const handleClick = () => {
        const odds: IOdd[] = props.ticketOdds.odds.map((odd: ITicketOdd) => (odd.odd))
        const ticket: ITicket = ({
            korisnik_id: props.user.id,
            uplata: amount,
            ishodi: odds
        });

        const placeTicket = async (ticket: ITicket) => {
            await TicketService.placeTicket(ticket).then((response) => {
                console.log("Placed ticket");
            });
        };
        placeTicket(ticket);

        props.updateOdds(emptyTicketOddList)
    }

    return (
    <div>
        <ListGroup>
            {props.ticketOdds.odds.map((ticketOdd: ITicketOdd) => (
                <ListGroup.Item key={ticketOdd.odd.id}>
                    <div>
                        <span>{ticketOdd.event.naziv} - {ticketOdd.market.naziv} - {ticketOdd.odd.naziv} {ticketOdd.odd.koeficijent}</span>
                    </div>
                </ListGroup.Item>
            ))}
            <ListGroup.Item key="uplata">
                <Form.Control 
                    type="number" 
                    placeholder="5" 
                    value={amount}
                    onChange={e => setAmount(+(e.target.value))} />
                <Button variant="light" onClick={() => handleClick()}>UPLATA</Button>
            </ListGroup.Item>
        </ListGroup>
    </div>
  );
};

export default Ticket;