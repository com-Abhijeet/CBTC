import { useNavigate } from "react-router-dom";
const Cards = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="Card-Container">
        <div className="card">
          <img className="card-img-top" src="/conference-card.jpg" alt="" />
          <div className="card-body">
            <h5 className="card-title">Conference</h5>
            <p className="card-text">
              Plan, Manage, Advertise your conference with Event360's Conference
              Assistance Hosting, and Management Services.
            </p>
            <a
              onClick={() => navigate("/CreateEvent")}
              className="btn btn-primary"
            >
              Create Conference
            </a>
          </div>
        </div>
        <div className="card">
          <img className="card-img-top" src="/concert-card.jpg" alt="" />
          <div className="card-body">
            <h5 className="card-title">Concerts</h5>
            <p className="card-text">
              Host your awesome concerts with Event360's seamless support,
              Management and ticket and seat hostings
            </p>
            <a
              className="btn btn-primary"
              onClick={() => navigate("/CreateEvent")}
            >
              Create Concert
            </a>
          </div>
        </div>
        <div className="card">
          <img className="card-img-top" src="/party-card.jpg" alt="" />
          <div className="card-body">
            <h5 className="card-title">Parties</h5>
            <p className="card-text">
              Host your parties with Event360's with free event management and
              invites , RSVP's and endless picture library
            </p>
            <a
              onClick={() => navigate("/CreateEvent")}
              className="btn btn-primary"
            >
              Host Party
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
