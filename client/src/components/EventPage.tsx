import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { ListGroup, Button } from "react-bootstrap";

import {EventParams, IMarket, IOdd, IOddList, IMarketList, emptyOddList, emptyMarketList} from "../types/Event"
import EventService from "../services/EventService";

type EventPageProps = {
    odds: IOddList,
    updateOdds: (arg: IOddList) => void
};

type MarketListProps = {
    markets: IMarketList,
    odds: IOddList,
    updateOdds: (arg: IOddList) => void
}

const MarketList: React.FC<MarketListProps> = (props) => {
    const [_odds, _setOdds] = useState<IOddList>(emptyOddList);

    useEffect(() => {
        _setOdds(props.odds)
    },[props.odds])

    const handleClick = (odd: IOdd) => {
        let newOdds = JSON.parse (JSON.stringify(props.odds))
        const indexOfObject = (id: string) => newOdds.odds.findIndex((o) => {
          return o.id === id;
        });

        let index: number = indexOfObject(odd.id)
        console.log("EventPage/MarketList/handleClick/indexOfObject: " + index)
        if (index !== -1) {
            newOdds.odds.splice(index, 1);
        } else {
            newOdds.odds.push(odd)
        }
        console.log("EventPage/MarketList/handleClick/odds: " + newOdds.odds)
        props.updateOdds(newOdds)
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
                                    <Button variant="outline-info" onClick={() => handleClick(odd)}>
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
    const [_odds, _setOdds] = useState<IOddList>(emptyOddList);
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
        _setOdds(props.odds)
    }, [props.odds]);

    return (
    <div>
        {loader ?
            (
                <>Loading markets...</>
            )
            :
            (
                <MarketList markets={markets} odds={props.odds} updateOdds={props.updateOdds}/>
            )
        }
    </div>
  );
};

export default EventPage;