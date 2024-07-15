import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext"; // Adjust the import according to your project structure
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Bookings = () => {
  const { userId } = useContext(UserContext) || {};
  const [bookings, setBookings] = useState<
    {
      _id: string;
      eventId: string;
      attendees: {
        name: string;
        contact: number;
        gender: string;
        age: number;
        _id: string;
      }[];
      totalAmount: number;
      bookedBy: string;
      purchaseDate: string;
    }[]
  >([]);

  useEffect(() => {
    console.log("User id ", userId);
    fetch(`http://localhost:3000/Ticket/getTicket/:${userId}`, {
      method: "GET",
      mode: "cors",
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
        setBookings(data.ticket || []);
        console.log(data.ticket);
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  }, [userId]);

  return (
    <>
      <Navbar />
      <h1 className="tkt-hdr"> MY Bookings</h1>
      <div className="booking-container">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div className="card ticket-card" key={booking._id}>
              <h5>Event Name: {booking.eventId}</h5>
              <small className="fw-bold">
                Total Amount: {booking.totalAmount}
              </small>
              <small className="fw-bold">
                Purchase Date: {new Date(booking.purchaseDate).toLocaleString()}
              </small>
              {booking.attendees.map((attendee) => (
                <div className="ticket-atnde-container" key={attendee._id}>
                  <h6>Attendees:</h6>
                  <small className="fw-bold">Name: {attendee.name}</small>
                  <small className="fw-bold">Contact: {attendee.contact}</small>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No bookings available</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Bookings;
