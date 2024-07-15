import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Cookies from "js-cookie"; // Import js-cookie to handle cookies
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const { userName } = useContext(UserContext) || {};
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setUserName, setUserId } = useContext(UserContext) || {};

  useEffect(() => {
    console.log("Use effect running");
    const token = Cookies.get("token");
    console.log("token in cookie", token);
    if (token) {
      try {
        setIsLoggedIn(true);
        const decoded: any = jwtDecode(token);
        console.log("decoded token", decoded);
        if (decoded.name && setUserName && setUserId) {
          setUserName(decoded.name);
          setUserId(decoded.id);
          console.log("decoded name : ", decoded.name);
          console.log("decoded id", decoded.id);
        }
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate("/Events")}>
                Events
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={()=>navigate("/Bookings")}>
                My Bookings
              </a>
            </li>
          </ul>
          <div className="my-2 my-lg-0">
            {isLoggedIn ? (
              <span className="fw-bold">
                <img className="avatar" src="./avatar.jpg" alt="" />
                {userName}!
              </span>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => navigate("/authenticate")}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
