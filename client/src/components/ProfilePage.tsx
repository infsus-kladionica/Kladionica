import React, { useEffect, useState } from "react";

import { useParams } from 'react-router-dom';
import { ListGroup, Button } from "react-bootstrap";

import {EventParams, IMarket, IOdd, IOddList, IMarketList, emptyOddList, emptyMarketList, IOddMarket} from "../types/Event"
import {IUser} from "../types/User"
import TicketService from "../services/TicketService";
import { emptyUserTicketList, IUserTicket, IUserTicketList } from "../types/Ticket";

type ProfilePageProps = {
    user: IUser
};

type UserTicketListProps = {
    userTickets: IUserTicketList
}

const UserTicketList: React.FC<UserTicketListProps> = (props) => {
    return (
        <div>
            <ListGroup>
                {props.userTickets.userTickets.map((userTicket: IUserTicket) => (
                    <ListGroup.Item key={userTicket.id}>
                        <div>
                            <div>Ticket</div>
                            <ListGroup>
                                {userTicket.odd_markets.map((oddMarket: IOddMarket) => (
                                    <ListGroup.Item key={oddMarket.id}>
                                        <>
                                            <span>{oddMarket.event_name} - {oddMarket.market_name} - {oddMarket.odd_name}: {oddMarket.koeficijent}</span>
                                        </>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <></>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

const ProfilePage: React.FC<ProfilePageProps> = (props) => {
    const [userTickets, setUserTickets] = useState<IUserTicketList>(emptyUserTicketList);
    const [loader, setLoader] = useState<Boolean>(true);
    useEffect(() => {
        const getMarkets = async (user_id: string) => {
            await TicketService.getUserTickets(user_id).then((response) => {
                const data: IUserTicket[] = response.data
                const dataList: IUserTicketList = {userTickets: data}
                setUserTickets(dataList)
                setLoader(false)
            });
        };
        console.log("UserID: " + props.user.id)
        getMarkets(props.user.id!);
    }, []);

    return (
    <div>
        {loader ?
            (
                <>Loading tickets...</>
            )
            :
            (
                <UserTicketList userTickets={userTickets}/>
            )
        }
    </div>
  );
}

export default ProfilePage;