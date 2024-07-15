import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Event {
  _id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  ticketPrice: number;
}

const EventCard = () => {
  // State to hold events data
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  // Fetch events from API
  useEffect(() => {
    fetch("http://localhost:3000/Event/events")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Check if data has an 'events' key and it is an array
        if (data.events && Array.isArray(data.events)) {
          setEvents(data.events);
          console.log(events);
        } else {
          console.error(
            "Fetched data does not contain an 'events' array:",
            data
          );
          // Optionally, set events to an empty array or handle this case as needed
          setEvents([]);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleClick = (event: Event) => {
    const eventId = event._id;
    console.log(eventId);
    if (eventId) {
      navigate(`/ViewEvent/${eventId}`);
    } else {
      console.error("Event ID is undefined");
    }
  };

  return (
    <>
      <h2 className="Events-Header fw-bold">Featured Events</h2>
      <div className="Events-Container">
        {events.map((event) => (
          <div className="Event-card-details" key={event._id}>
            <div className="Event-card-detail-group">
              <small className="Event-card-detail-field">Event Name</small>
              <p className="Event-card-detail-field fw-bold">{event.name}</p>
            </div>
            <div className="Event-card-detail-group">
              <small className="Event-card-detail-field">Location</small>
              <p className="Event-card-detail-field fw-bold">
                {event.location}
              </p>
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
            <button
              className="btn btn-primary"
              onClick={() => handleClick(event)}
            >
              View{" "}
            </button>
          </div>
        ))}
      </div>
      <hr />
    </>
  );
};

export default EventCard;
