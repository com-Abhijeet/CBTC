import Navbar from "../components/Navbar";
import Cards from "../components/Cards";
import Jumbotron from "../components/Jumbotron";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";
import Subscription from "../components/Subscription";
const Homepage = () => {
  return (
    <div>
      <Navbar />
      <Jumbotron />
      <Cards />
      <EventCard />
      <Subscription />
      <Footer />
    </div>
  );
};

export default Homepage;
