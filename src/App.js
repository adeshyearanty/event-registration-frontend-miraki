import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Components/Home.jsx'
import Participants from './Components/Participants.jsx'
import Register from './Components/Register.jsx'
import ThankYou from './Components/ThankYou.jsx'
import EventsInfo from "./Components/EventsInfo.jsx"
import './Static/index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/thankyou" element={<ThankYou />}/>
        <Route path="/participants" element={<Participants />}/>
        <Route path="/eventsinfo" element={<EventsInfo />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
