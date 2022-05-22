import React, {useState, useEffect} from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';

import NavBar from './components/NavBar';
import Register from "./components/Register";
import Login from './components/Login';
import Home from './components/Home';
import EventPage from './components/EventPage';
import Ticket from './components/Ticket';
import { ITicketOddList, emptyTicketOddList, IEvent, emptyEvent } from './types/Event';
import { IUser, emptyUser } from './types/User';

const App: React.FC = () => {
  const [odds, setOdds] = useState<ITicketOddList>(emptyTicketOddList);
  const [event, setEvent] = useState<IEvent>(emptyEvent);
  const [user, setUser] = useState<IUser>(emptyUser);
  console.log("U App.tsx")

  useEffect(() => {
    console.log("U App.tsx")
  }, []);

  const updateOdds = (newOdds: ITicketOddList): void => {
    setOdds(newOdds)
  }

  const updateEvent = (newEvent: IEvent): void => {
    setEvent(newEvent)
  }

  const updateUser = (newUser: IUser): void => {
    console.log(newUser.id)
    setUser(newUser)
  }

  return (
    <>
      <NavBar user={user} updateUser={updateUser}/>
      <div className="container-fluid pt-4">
        <div className="row justify-content-center">
          <div className="col-6">
            <Routes>
              <Route path="/" element={<Home updateEvent={updateEvent}/>} />
              <Route path="/login" element={<Login updateUser={updateUser}/>} />
              <Route path="/register" element={<Register updateUser={updateUser}/>} />
              <Route path="/event/:id" element={<EventPage event={event} ticketOdds={odds} updateOdds={updateOdds}/>} />
            </Routes>
          </div>
            {odds.odds.length > 0 && (
            <div className="col-6">
              <Ticket user={user} ticketOdds={odds} updateOdds={updateOdds}/>
            </div>)}
        </div>
      </div>
    </>
  );
}

export default App;
