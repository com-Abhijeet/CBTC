import React from "react";
import Navbar from "../components/Navbar";
import EventView from "../components/EventView";
import EventCard from "../components/EventCard";
import EventList from "../components/EventList";
import Footer from "../components/Footer";

const ShowEvents = () => {
  return (
    <>
      <Navbar />
      <EventList/>
      <Footer/>
    </>
  );
};

export default ShowEvents;
