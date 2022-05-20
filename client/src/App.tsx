import React, {useState, useEffect} from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';

import { useLocalStorage } from './common/useLocalStorage';
import NavBar from './components/NavBar';
import Register from "./components/Register";
import Login from './components/Login';
import Home from './components/Home';
import EventPage from './components/EventPage';
import Ticket from './components/Ticket';
import { IOddList, emptyOddList } from './types/Event';

const App: React.FC = () => {
  const [odds, setOdds] = useState<IOddList>(emptyOddList);

  const updateOdds = (newOdds: IOddList): void => {
    console.log("App: updating odds: " + newOdds.odds)
    console.log("Odds: " + odds.odds)
    setOdds(newOdds)
    console.log("New odds: " + odds.odds)
  }

  useEffect(() => {
    console.log("App UseEffect")
    console.log("App odds: " + odds.odds)
  }, [odds]);

  return (
    <>
      <NavBar/>
      <div className="container-fluid pt-4">
        <div className="row justify-content-center">
          <div className="col-6">
            <Routes>
              <Route path="/" element={<Login/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/home" element={<Home />} />
              <Route path="/event/:id" element={<EventPage odds={odds} updateOdds={updateOdds}/>} />
            </Routes>
          </div>
            {odds.odds.length > 0 && (
            <div className="col-6">
              <Ticket odds={odds} updateOdds={updateOdds}/>
            </div>)}
        </div>
      </div>
    </>
  );
}

export default App;
