import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useTicket } from "../context/TicketContext";

const TicketForm = () => {
  const [noOfAttendee, setNoOfAttendee] = useState(1);
  const navigate = useNavigate();
  const { tickets, setTickets } = useTicket();
  const { userId } = useContext(UserContext) || {};
  const { id } = useParams();

  const [attendee, setAttendee] = useState<
    { [key: string]: string | number }[]
  >([
    {
      name: "",
      contact: 0,
      gender: "",
      age: 0,
    },
  ]);

  const handleAddAttendee = () => {
    setAttendee([
      ...attendee,
      {
        name: "",
        contact: 0,
        gender: "",
        age: 0,
      },
    ]);
    setNoOfAttendee(noOfAttendee + 1);
  };
  const handleAttendeeChange = (index: number, field: string, value: any) => {
    const newAttendees = [...attendee];
    newAttendees[index][field] = value;
    setAttendee(newAttendees);
    console.log("new Attendees ", newAttendees);
  };

  const handleBookTicket = () => {
    console.log("Attendes are", attendee);

    const eventId = id;
    const paymentId = "P123AS89";
    const PaymentStatus = "Pending";
    const totalAmount = noOfAttendee * 800;
    const bookedBy = userId;

    const newTicket = {
      eventId,
      attendee,
      paymentId,
      PaymentStatus,
      totalAmount,
      bookedBy,
    };

    setTickets([...tickets, newTicket]);

    fetch("http://localhost:3000/Ticket/CreateTicket", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId,
        attendee,
        paymentId,
        PaymentStatus,
        totalAmount,
        bookedBy,
      }),
    })
      .then((res) => {
        if (res.status === 201) {
          navigate("/payment");
          <Navigate to={"/payment"} />;
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("error1", error);
      });
  };
  return (
    <>
      <div className="ticket-form-container">
        {Array.from(Array(noOfAttendee)).map((_, index) => {
          return (
            <>
              <div className="ticket-form-group" key={index}>
                <small className="fst-italic">Attendee {index + 1}</small>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control event-form-input"
                    id="Attendee-name"
                    placeholder="Name"
                    required
                    onChange={(e) =>
                      handleAttendeeChange(index, "name", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    className="form-control event-form-input"
                    id="Attendee-contact"
                    placeholder="Contact"
                    required
                    onChange={(e) =>
                      handleAttendeeChange(index, "contact", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    className="form-control event-form-input"
                    id="Attendee-Gender"
                    placeholder="Gender"
                    required
                    onChange={(e) =>
                      handleAttendeeChange(index, "gender", e.target.value)
                    }
                  />

                  <input
                    type="number"
                    className="form-control event-form-input"
                    id="Attendee-Age"
                    placeholder="Age"
                    required
                    onChange={(e) =>
                      handleAttendeeChange(index, "age", e.target.value)
                    }
                  />
                </div>
              </div>
            </>
          );
        })}
        <div className="ticket-form-actions">
          <button
            className="btn btn-primary ticket-form-btn float-end "
            onClick={handleAddAttendee}
          >
            Add More
          </button>
          <button
            className="btn btn-primary float-end ticket-form-btn"
            onClick={handleBookTicket}
          >
            Book Ticket
          </button>
        </div>
      </div>
    </>
  );
};
export default TicketForm;
