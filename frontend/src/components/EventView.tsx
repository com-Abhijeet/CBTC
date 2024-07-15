import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EventView = () => {
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
  const navigate = useNavigate();
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
        <>
          <div className="event-image">
            <img src="/Concert.jpg" alt="" />
          </div>
          <div className="event-details">
            <div className="event-detail-group">
              <small className="event-detail-field">Event Name</small>
              <p className="event-detail-field fw-bold">{event.name}</p>
            </div>
            <div className="event-detail-group">
              <small className="event-detail-field">Location</small>
              <p className="event-detail-field fw-bold">{event.location}</p>
            </div>
            <div className="event-detail-group">
              <small className="event-detail-field">Date</small>
              <p className="event-detail-field fw-bold">{event.date}</p>
            </div>
            <div className="event-detail-group">
              <small className="event-detail-field">Time</small>
              <p className="event-detail-field fw-bold">{event.time}</p>
            </div>
            <div className="event-detail-group">
              <small className="event-detail-field">Ticket Price</small>
              <p className="event-detail-field fw-bold">{event.ticketPrice}</p>
            </div>
            <div className="event-detail-group">
              <button
                className="btn btn-primary book-ticket-btn"
                onClick={() => navigate(`/BookTicket/${id}`)}
              >
                Book Ticket
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EventView;
