import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { ListGroup, Button, Form } from "react-bootstrap";

import {EventParams, IMarket, IOdd, IOddList, ITicketOddList, ITicketOdd, emptyTicketOddList, IMarketList, emptyOddList, emptyOdd, emptyMarketList, IEvent} from "../types/Event"
import {IUser} from "../types/User"
import EventService from "../services/EventService";

type EventPageProps = {
    event: IEvent
    ticketOdds: ITicketOddList,
    updateOdds: (arg: ITicketOddList) => void,
    user: IUser
};

type MarketListProps = {
    event: IEvent
    markets: IMarketList,
    ticketOdds: ITicketOddList,
    updateOdds: (arg: ITicketOddList) => void
    refresh: () => void
    user: IUser
}

const MarketList: React.FC<MarketListProps> = (props) => {
    const [odds, setOdds] = useState<ITicketOddList>(emptyTicketOddList);
    const [changingOdd, setChangingOdd] = useState<IOdd>(emptyOdd);

    useEffect(() => {
        setOdds(props.ticketOdds)
    },[props.ticketOdds, changingOdd])

    const handleOddClick = (event: IEvent, market: IMarket, odd: IOdd) => {
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

    const handleOddClickChange = (odd: IOdd) => {
        setChangingOdd(odd)
    }

    const handleChangeOdd = () => {
        const changeOdd = async (odd: IOdd) => {
            await EventService.changeOdd(odd).then((response) => {
                setChangingOdd(emptyOdd)
            });
        };

        changeOdd(changingOdd);
        props.refresh();
    }

    return (
        <div>
            <ListGroup>
                {props.markets.markets.map((market: IMarket) => (
                    <ListGroup.Item key={market.id}>
                        <div>
                            <span>{market.naziv} </span>
                            {market.ishodi.map((odd: IOdd) => (
                                <span key={odd.id}>
                                    {odd.id != changingOdd.id ?
                                    (
                                        <Button variant="outline-info" onClick={() => {
                                            if(!props.user.je_admin) handleOddClick(props.event, market, odd)
                                            else handleOddClickChange(odd)
                                        }}>
                                            <span>{odd.naziv} </span>
                                            <span>{odd.koeficijent} </span>
                                        </Button> 
                                    )
                                    :
                                    (
                                        <div>
                                            <span>{odd.naziv}</span>
                                            <Form.Control 
                                                type="number" 
                                                placeholder={odd.koeficijent.toString()}
                                                value={changingOdd.koeficijent}
                                                onChange={e => {
                                                    const newOdd: IOdd = ({
                                                        id: odd.id,
                                                        ponuda_id: odd.ponuda_id,
                                                        naziv: odd.naziv,
                                                        koeficijent: +(e.target.value)
                                                    });
                                                    setChangingOdd(newOdd);
                                                }} />
                                        </div>
                                    )}
                                </span>
                            ))}
                            {props.user.je_admin && (
                                <Button variant="outline-dark" onClick={() => handleChangeOdd()}>
                                    Promijeni Koeficijent
                                </Button> 
                            )}
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
    const [myRefresh, setMyRefresh] = useState<Boolean>(false);

    const refresh = () => {
        setMyRefresh(true)
    } 

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
        setMyRefresh(false)
    }, [props.ticketOdds, myRefresh]);

    return (
    <div>
        {loader ?
            (
                <>Loading markets...</>
            )
            :
            (
                <MarketList event={props.event} markets={markets} ticketOdds={props.ticketOdds} updateOdds={props.updateOdds} user={props.user} refresh={refresh}/>
            )
        }
    </div>
  );
};

export default EventPage;