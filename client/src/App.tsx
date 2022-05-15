import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';

import NavBar from './components/NavBar';
import Register from "./components/Register";
import Login from './components/Login';
import Home from './components/Home';
import EventPage from './components/EventPage';

const App: React.FC = () => {
  return (
    <>
      <NavBar/>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/event/:id" element={<EventPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
