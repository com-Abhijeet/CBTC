import { useState, useEffect, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Jumbotron from "./Jumbotron";

interface Event {
  _id: number;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  ticketPrice: number;
}

const EventList = () => {
  // State to hold events data
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedLocation, setSelectedLocation] = useState("");
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

  // Get unique locations from events
  const locations = Array.from(new Set(events.map((event) => event.location)));

  // Filter events based on search term, selected date, and selected location
  const filteredEvents = events.filter((event) => {
    const matchesSearchTerm = new RegExp(searchTerm, "i").test(event.name);
    const matchesDate = selectedDate
      ? new Date(event.date).toDateString() === selectedDate.toDateString()
      : true;
    const matchesLocation = selectedLocation
      ? event.location === selectedLocation
      : true;
    return matchesSearchTerm && matchesDate && matchesLocation;
  });

  const handleClick = (event: Event) => {
    navigate(`/ViewEvent/${event._id}`);
  };

  return (
    <>
      <div
        className="filter-bar navbar navbar-light"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <small> Filters </small>
        <input
          type="search"
          className="form-control mr-sm-2 filter-search-box"
          placeholder="Search events"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="datepicker-container">
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            placeholderText="Select date"
            className="custom-datepicker"
          />
        </div>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
      <Jumbotron />
      <div className="Events-Container">
        {filteredEvents.map((event) => (
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
    </>
  );
};

export default EventList;
