import React, { useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import WaitPayment from "../components/WaitPayment";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext"; // Adjust the import path as necessary
import { useTicket } from "../context/TicketContext";
import Footer from "../components/Footer";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Payment = () => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { willReadFrequently: true });
  const navigate = useNavigate();
  const { userName } = useContext(UserContext) || {};
  const { tickets } = useTicket();
  const { clearTickets } = useTicket();
  console.log(tickets);
  const totalAmount = tickets.reduce(
    (acc, ticket) => acc + ticket.totalAmount,
    0
  );

  const loadRazorpay = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post(
      "http://localhost:3000/payment/create-order",
      {
        amount: totalAmount,
      }
    );

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_g7Qv9qKEggFl5v", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "EventPlanner360",
      description: "Booking for a Event",
      order_id: order_id,
      handler: async function (response: {
        razorpay_payment_id: any;
        razorpay_order_id: any;
        razorpay_signature: any;
      }) {
        const data = {
          razorpay_order_id: order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };

        const result = await axios.post(
          "http://localhost:3000/payment/verify-payment",
          data
        );

        if (!result) {
          alert("Payment failed");
          return;
        }

        if (result && result.data && result.data.message) {
          alert(result.data.message);
        } else {
          alert("Message is undefined");
        }
        clearTickets();
        console.log("navigated");
        navigate("/");
        // <Navigate to="/" />;
      },
      prefill: {
        name: userName,
        email: "example@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Building 105, Road 11 , Pune",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // useEffect(() => {
  //   handlePayment();
  // }, []);

  return (
    <>
      <Navbar />
      <WaitPayment />
      <div className="pay-cnt">
        <button className="btn btn-primary pay-now-btn" onClick={handlePayment}>
          Pay Now
        </button>
      </div>
      <Footer/>
    </>
  );
};

export default Payment;
