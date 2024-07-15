import React from "react";
import Navbar from "./Navbar";

const WaitPayment = () => {
  return (
    <>
      <div className="wt-pymnt-cnt">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h1 className="fsd-italic">Payment Processing</h1>
        <small className="fsd-italic waiting-txt">
          Please wait while we are redirecting....
        </small>
      </div>
    </>
  );
};

export default WaitPayment;
