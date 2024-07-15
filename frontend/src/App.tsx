import Homepage from "./pages/Homepage";
import Authenticate from "./pages/Authenticate";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { UserProvider } from "./context/userContext";
import { TicketProvider } from "./context/TicketContext";
import CreateEvent from "./pages/CreateEvent";
import Event from "./pages/Event";
import Ticket from "./pages/Ticket";
import Payment from "./pages/Payment";
import ShowEvents from "./pages/ShowEvents";
import Bookings from "./pages/Bookings";

const App = () => {
  return (
    <>
      <UserProvider>
        <TicketProvider>
          {" "}
          {/* Wrap with TicketProvider */}
          <Router>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/authenticate" element={<Authenticate />} />
              <Route path="/CreateEvent" element={<CreateEvent />} />
              <Route path="/ViewEvent/:id" element={<Event />} />
              <Route path="/BookTicket/:id" element={<Ticket />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/Events" element={<ShowEvents />} />
              <Route path="/Bookings" element={<Bookings />} />
            </Routes>
          </Router>
        </TicketProvider>
      </UserProvider>
    </>
  );
};

export default App;
