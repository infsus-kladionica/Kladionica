import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { ListGroup } from "react-bootstrap";

import {EventParams, IMarket, IOdd, IMarketList} from "../types/Event"

import EventService from "../services/EventService";

const MarketList: React.FC<IMarketList> = (markets: IMarketList) => {
    return (
        <div>
            <ListGroup>
                {markets.markets.map((market: IMarket) => (
                    <ListGroup.Item key={market.id}>
                        <div>
                            <span>{market.naziv}</span>
                            {market.ishodi.map((odd: IOdd) => (
                                <span> | {odd.naziv} {odd.koeficijent}</span>
                            ))}
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

const EventPage: React.FC = () => {
    const {id} = useParams<EventParams>();
    const [markets, setMarkets] = useState<IMarket[]>([]);
    const [loader, setLoader] = useState<Boolean>(true);
    useEffect(() => {
        const getMarkets = async (event_id: string) => {
            await EventService.getMarkets(event_id).then((response) => {
                let data: IMarket[] = response.data
                setMarkets(data)
                setLoader(false)
            });
        };
        getMarkets(id!);
    }, []);

    return (
    <div>
        {loader ?
            (
                <>Loading markets...</>
            )
            :
            (
                <MarketList markets={markets}/>
            )
        }
    </div>
  );
};

export default EventPage;