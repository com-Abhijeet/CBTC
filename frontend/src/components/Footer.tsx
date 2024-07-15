import React from "react";

const Footer = () => {
  return (
    <>
      <div className="footer-container ">
        <div className="footer-container-1">
          <h2>About Us</h2>
          <p>
            We are a team of developers who are passionate about building
            applications that help the community.
          </p>
        </div>
        <div className="footer-container-2">
          <h2>Services</h2>
          <ul>
            <li>Home</li>
            <li>Services</li>
            <li>Products</li>
            <li>Events</li>
          </ul>
        </div>
        <div className="footer-container-3">
          <h2>Contact Us</h2>
          <ul>
            <li>Email : contact@developers.com</li>
            <li>Phone : +1234567890</li>
            <li>Address : Building 36 , Road 125 , Hinjewadi , Pune</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
