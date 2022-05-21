import React, { useEffect, useState } from "react";
/*
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

const TicketList: React.FC<MarketListProps> = (props) => {
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
        if (index !== -1) {
            newOdds.odds.splice(index, 1);
        } else {
            newOdds.odds.push(odd)
        }
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

const ProfilePage: React.FC<EventPageProps> = (props) => {
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
                <TicketList />
            )
        }
    </div>
  );
};

export default ProfilePage;
*/

const ProfilePage: React.FC = () => {
    return (
        <div>ProfilePage</div>
    )
}

export default ProfilePage;