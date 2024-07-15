import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const EventForm = () => {
  const navigate = useNavigate();
  const { userId } = useContext(UserContext) || { userId: "" };
  const [counter, setCounter] = useState(1);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [creator, setCreator] = useState("");
  const [budget, setBudget] = useState("");
  const [type, setType] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  // Host state
  const [hostName, setHostName] = useState("");
  const [hostEmail, setHostEmail] = useState("");
  const [hostContact, setHostContact] = useState("");
  const [hostAltContact, setHostAltContact] = useState("");
  const [hostStatus, setHostStatus] = useState("Invited");

  // Vendors state
  const [vendors, setVendors] = useState<{ [key: string]: string | number }[]>([
    {
      name: "",
      email: "",
      role: "",
      cost: 0,
      amountPaid: 0,
      amountDue: 0,
    },
  ]);

  const handleVendorChange = (index: number, field: string, value: any) => {
    const newVendors = [...vendors];
    newVendors[index][field] = value;
    setVendors(newVendors);
  };

  useEffect(() => {
    setCreator(userId);
  }, [userId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !name ||
      !description ||
      !date ||
      !time ||
      !location ||
      !budget ||
      !type
    ) {
      alert("Please fill all the required fields");
      return;
    }
    if (!agreeTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    const host = {
      name: hostName,
      email: hostEmail,
      contact: hostContact,
      altContact: hostAltContact,
      status: hostStatus,
    };

    const eventData = {
      name: name,
      description,
      date: date, // Ensure this is not empty
      time: time,
      location: location, // Ensure this is not empty
      creator: creator, // Ensure this is a valid ObjectId
      budget: budget,
      type: type, // Ensure this is a valid enum value
      isPrivate,
      host,
      vendors,
    };

    console.log("Event Data: ", eventData);

    // Validate required fields
    if (!eventData.date || !eventData.location) {
      alert("Date and Location are required.");
      return;
    }

    // Send data to post API
    fetch("http://localhost:3000/Event/create", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    })
      .then((res) => res.json())
      .then((res) => {
        const eventId = res._id;
        console.log(res);
        navigate(`/ViewEvent/${eventId}`);
      })
      .catch((err) => {
        console.log(err);
      });
    alert("Event Created Successfully");
  };

  return (
    <>
      <div className="header-container-event-form ">
        <h1 className="display-6">Create Event</h1>
        <p className="lead event-form-sb-header ">
          Fill the form to create an event
        </p>
      </div>
      <hr />

      <div className="event-form-cnt">
        <small className="fw-bold">Event Details</small>
        <form className="event-form needs-validation" onSubmit={handleSubmit}>
          <div className="input-group mb-3 ">
            <input
              type="email"
              className="form-control event-form-input validationDefault01"
              id="Event-Title"
              placeholder="Event Title"
              required
              onChange={(e) => setName(e.target.value)}
            />

            <select
              className="form-select event-form-input"
              aria-label="Default select example"
              required
              onChange={(e) => setType(e.target.value)}
            >
              <option defaultValue="0">Event Type</option>
              <option value="Conferance">Conference</option>
              <option value="Concert">Concert</option>
              <option value="Party">Party</option>
              <option value="marriage">Marriage</option>
              <option value="Private">Private Event</option>
            </select>
            <span className="input-group-text">RS</span>
            <input
              type="text"
              className="form-control event-form-input"
              id="Event Budget"
              placeholder="Event Budget"
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="date"
              className="form-control event-form-input"
              id="Event-Date"
              placeholder="Event Date"
              required
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="time"
              className="form-control event-form-input"
              id="Event-Time"
              placeholder="Event Time"
              required
              onChange={(e) => setTime(e.target.value)}
            />
            <input
              type="text"
              className="form-control event-form-input"
              id="Event-Location"
              placeholder="Location"
              required
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <textarea
              className="form-control event-form-input"
              id="Event-Description"
              placeholder="Event Description"
              aria-label="with textArea"
              required
              onChange={(e) => setdescription(e.target.value)}
            />
          </div>

          <div className="input-group mb-3">
            <label htmlFor="formFile" className="form-label form-file-label">
              Add Event Cover Banner
            </label>
            <input
              className="form-control event-form-input"
              type="file"
              id="formFile"
              placeholder="Event Cover Banner"
            />
          </div>
          <div className="form-check ">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) => setIsPrivate(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Private Event{" "}
              <i>
                (Ticket Booking will not be available for private Events, USE
                RSVP Instead)
              </i>
            </label>
          </div>

          <hr />
          <small className="fw-bold">Host Details</small>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control event-form-input"
              id="Event-Host"
              placeholder="Host Name"
              required
              onChange={(e) => setHostName(e.target.value)}
            />
            <input
              type="email"
              className="form-control event-form-input"
              id="Event-Host-Email"
              placeholder="Host Email"
              required
              onChange={(e) => setHostEmail(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control event-form-input"
              id="Event-Host-Contact"
              placeholder="Host Contact"
              required
              onChange={(e) => setHostContact(e.target.value)}
            />
            <input
              type="text"
              className="form-control event-form-input"
              id="Event-host-Alt-Contact"
              placeholder="Alternate Contact"
              required
              onChange={(e) => setHostAltContact(e.target.value)}
            />
            <input
              type="text"
              className="form-control event-form-input"
              id="Event-Host-Status"
              placeholder="Host Status"
              defaultValue={"Host Status : Invited"}
              readOnly
              required
              onChange={(e) => setHostStatus(e.target.value)}
            />
          </div>
          <small>
            Host will be invited once the Event is Created , via default contact
            email
          </small>
          <hr />
          <small className="fw-bold">Vendor Details</small>
          {Array.from(Array(counter)).map((_, index) => {
            return (
              <div className="vendor-form-group" key={index}>
                <small className="fst-italic">Vendor {index + 1}</small>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control event-form-input"
                    id="Event-Vendor"
                    placeholder="Vendor Name"
                    required
                    onChange={(e) =>
                      handleVendorChange(index, "name", e.target.value)
                    }
                  />
                  <input
                    type="email"
                    className="form-control event-form-input"
                    id="Event-Vendor-Email"
                    placeholder="Vendor Email"
                    required
                    onChange={(e) =>
                      handleVendorChange(index, "email", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    className="form-control event-form-input"
                    id="Event-Vendor-role"
                    placeholder="Vendor Task (eg. Catering, Decoration)"
                    required
                    onChange={(e) =>
                      handleVendorChange(index, "role", e.target.value)
                    }
                  />
                </div>
                <div className="input-group mb-3 vendor-input-group">
                  <input
                    type="text"
                    className="form-control event-form-input"
                    id="Vendor Cost"
                    placeholder="Vendor Cost"
                    required
                    onChange={(e) =>
                      handleVendorChange(index, "cost", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    className="form-control event-form-input"
                    id="Vendor-amount-paid"
                    placeholder="Amount Paid"
                    required
                    onChange={(e) =>
                      handleVendorChange(index, "amountPaid", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    className="form-control event-form-input"
                    id="Vendor-amount-due"
                    placeholder="Amount Due :"
                    required
                    onChange={(e) =>
                      handleVendorChange(index, "amountDue", e.target.value)
                    }
                  />
                </div>
              </div>
            );
          })}
          <button
            type="button"
            name="add-vendor-btn"
            className="btn btn-primary add-vendor-btn"
            onClick={() => setCounter(counter + 1)}
          >
            Add More Vendors
          </button>
        </form>
      </div>
      <div className="event-form-footer">
        <div className="form-check">
          <input
            className="form-check-input terms-checkbox"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
          <label
            className="form-check-label terms-label"
            htmlFor="flexCheckDefault"
          >
            I agree to the terms and conditions , By creating the event You are
            agreeging to all the terms and conditions. EventPlanner360 holds the
            right to cancel the event hosting if deemed necessary.
          </label>
          <button
            type="submit"
            name="create-event-btn"
            className="btn btn-primary create-event-btn"
            onClick={handleSubmit}
          >
            Create Event
          </button>
        </div>
      </div>
    </>
  );
};

export default EventForm;
