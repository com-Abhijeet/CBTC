import React from "react";

const Subscription = () => {
  return (
    <>
      <div className="sub-container">
        <h1>Subscribe to our newsletter</h1>
        <p>
          Subscribe to our newsletter to get the latest updates on featured
          Events , offers and more....
        </p>
        <form className="input-group">
          <input
            className="form-control"
            type="email"
            placeholder="Enter your email"
          />
          <button className="btn btn-secondary text-dark bg-light ">
            Subscribe
          </button>
        </form>
      </div>
      <hr />
    </>
  );
};

export default Subscription;
