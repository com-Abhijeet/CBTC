import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EventCardOne = () => {
  const { id } = useParams();
  interface Event {
    id: string;
    name: string;
    description: string;
    location: string;
    date: string;
    time: string;
    ticketPrice: string;
  }
  const [event, setEvent] = useState<Event | undefined>();
  useEffect(() => {
    console.log("Event id ", id);
    fetch(`http://localhost:3000/Event/getEvent/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setEvent(data.event);
        console.log(event);
        // console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);
  return (
    <>
      {event && (
        <div className="Event-card-details">
          <div className="Event-card-detail-group">
            <small className="Event-card-detail-field">Event Name</small>
            <p className="Event-card-detail-field fw-bold">{event.name}</p>
          </div>
          <div className="Event-card-detail-group">
            <small className="Event-card-detail-field">Location</small>
            <p className="Event-card-detail-field fw-bold">{event.location}</p>
          </div>
          <div className="Event-card-detail-group">
            <small className="Event-card-detail-field">Date</small>
            <p className="Event-card-detail-field fw-bold">{event.date}</p>
          </div>
          <div className="Event-card-detail-group">
            <small className="Event-card-detail-field">Time</small>
            <p className="Event-card-detail-field fw-bold">{event.time}</p>
          </div>{" "}
          <div className="Event-card-detail-group">
            <small className="Event-card-detail-field">Ticket Price</small>
            <p className="Event-card-detail-field fw-bold">
              {event.ticketPrice}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default EventCardOne;
