import TicketForm from "../components/TicketForm"; // Import the TicketForm component
import Navbar from "../components/Navbar";
import EventCardOne from "../components/EventCardOne";
import Footer from "../components/Footer";

const Ticket = () => {
  return (
    <>
      <Navbar />
      <div className="ticket-header">
        <h1 className="fw-bold tkt-hdr">Book Ticket</h1>
        <EventCardOne />
        <hr />
      </div>
      <TicketForm />
      <Footer />
    </>
  );
};

export default Ticket;
