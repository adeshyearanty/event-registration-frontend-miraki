import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const EventsInfo = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${process.env.SERVER_URL}/events`);
        console.log(response.data);
        setEvents(response.data);
      } catch (error) {
        console.error("Error retrieving events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <Link className="home-btn btn btn-primary" to="/">
        Go to Home Page
      </Link>
      {events.map((event) => (
        <div className="card mb-3" key={event.id}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img 
                src={process.env.SERVER_URL + event.imagePath} 
                className="card-img" 
                alt={event.name} 
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">{event.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Link className="events-btn btn btn-primary" to="/register">
        Register to an Event
      </Link>
    </div>
  );
};

export default EventsInfo;
