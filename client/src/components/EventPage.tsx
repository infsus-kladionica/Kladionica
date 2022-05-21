import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { ListGroup, Button } from "react-bootstrap";

import {EventParams, IMarket, IOdd, IOddList, ITicketOddList, ITicketOdd, emptyTicketOddList, IMarketList, emptyOddList, emptyMarketList, IEvent} from "../types/Event"
import EventService from "../services/EventService";

type EventPageProps = {
    event: IEvent
    ticketOdds: ITicketOddList,
    updateOdds: (arg: ITicketOddList) => void
};

type MarketListProps = {
    event: IEvent
    markets: IMarketList,
    ticketOdds: ITicketOddList,
    updateOdds: (arg: ITicketOddList) => void
}

const MarketList: React.FC<MarketListProps> = (props) => {
    const [odds, setOdds] = useState<ITicketOddList>(emptyTicketOddList);

    useEffect(() => {
        setOdds(props.ticketOdds)
    },[props.ticketOdds])

    const handleClick = (event: IEvent, market: IMarket, odd: IOdd) => {
        let newTicketOdds = JSON.parse (JSON.stringify(props.ticketOdds))
        const indexOfObject = (id: string) => newTicketOdds.odds.findIndex((o) => {
          return o.odd.id === id;
        });

        let index: number = indexOfObject(odd.id)
        if (index !== -1) {
            newTicketOdds.odds.splice(index, 1);
        } else {
            const newTicketOdd: ITicketOdd = ({
                odd: odd,
                market: market,
                event: event
            });
            newTicketOdds.odds.push(newTicketOdd)
        }
        props.updateOdds(newTicketOdds)
    }
    return (
        <div>
            <ListGroup>
                {props.markets.markets.map((market: IMarket) => (
                    <ListGroup.Item key={market.id}>
                        <div>
                            <span>{market.naziv}</span>
                            {market.ishodi.map((odd: IOdd) => (
                                <span key={odd.id}>
                                    <Button variant="outline-info" onClick={() => handleClick(props.event, market, odd)}>
                                        {odd.naziv}  {odd.koeficijent}
                                    </Button> 
                                </span>
                            ))}
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

const EventPage: React.FC<EventPageProps> = (props) => {
    const {id} = useParams<EventParams>();
    const [markets, setMarkets] = useState<IMarketList>(emptyMarketList);
    const [odds, setOdds] = useState<ITicketOddList>(emptyTicketOddList);
    const [loader, setLoader] = useState<Boolean>(true);
    useEffect(() => {
        const getMarkets = async (event_id: string) => {
            await EventService.getMarkets(event_id).then((response) => {
                const data: IMarket[] = response.data
                const dataList: IMarketList = {markets: data}
                setMarkets(dataList)
                setLoader(false)
            });
        };
        getMarkets(id!);
        setOdds(props.ticketOdds)
    }, [props.ticketOdds]);

    return (
    <div>
        {loader ?
            (
                <>Loading markets...</>
            )
            :
            (
                <MarketList event={props.event} markets={markets} ticketOdds={props.ticketOdds} updateOdds={props.updateOdds}/>
            )
        }
    </div>
  );
};

export default EventPage;