import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Footer from "../../components/Footer";
import "../../styles/Register.css";

export default function MyEvents() {
  const [user, setUser] = useState(null);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const Id = localStorage.getItem("Id");
    fetch(`${process.env.REACT_APP_API_URL}/users/${Id}/events`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      });
  }, []);

  useEffect(() => {
    const Id = localStorage.getItem("Id");
    fetch(`${process.env.REACT_APP_API_URL}/users/${Id}`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  useEffect(() => {
    if (user) {
      setFname(user.fname);
      setLname(user.lname);
      setProfilePic(user.profilePic);
    }
  }, [user]);

  const LogoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("Id");
  };

  const NavBarUser = (
    <div className="container-xxl position-relative p-0">
      <nav
        id="navbar"
        className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0"
      >
        <div className="navbar-brand">
          <img src="img/logo.png" alt="logo" className="navbar-logo" />
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="fa fa-bars"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0">
            <NavLink to="/home" className="nav-item nav-link active">
              Home
            </NavLink>
            <a href="" className="nav-item nav-link">
              About
            </a>
            <NavLink to="/EventsList" className="nav-item nav-link">
              Events
            </NavLink>
            <NavLink to="/payment" className="nav-item nav-link">
              Clubs
            </NavLink>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <img
                  src={`img/${profilePic}`}
                  alt="Image"
                  height="35"
                  width="35"
                  style={{
                    borderRadius: "50%",
                    border: "2px solid #ccc",
                    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.2)",
                    padding: "2px",
                  }}
                />{" "}
                {fname} {lname}
              </a>
              <div className="dropdown-menu m-0">
                <NavLink to="/Profile" className="dropdown-item">
                  Edit Profile
                </NavLink>
                <NavLink
                  to="/Login"
                  className="dropdown-item"
                  onClick={LogoutHandler}
                >
                  Logout
                </NavLink>
                <a href="" className="dropdown-item">
                  About
                </a>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn text-secondary ms-3"
            data-bs-toggle="modal"
            data-bs-target="#searchModal"
          >
            <i className="fa fa-search"></i>
          </button>
        </div>
      </nav>
      <div className="container-xxl py-5 bg-primary hero-header mb-5">
        <div className="container my-5 py-5 px-lg-5">
          <div className="row g-5 py-5">
            <div className="col-lg-6 text-center text-lg-start">
              {/* <h1 className="text-white mb-4 animated zoomIn">
                            All in one SEO tool need to grow your business rapidly
                          </h1>
                          <p className="text-white pb-3 animated zoomIn">
                            Tempor rebum no at dolore lorem clita rebum rebum ipsum rebum
                            stet dolor sed justo kasd. Ut dolor sed magna dolor sea diam.
                            Sit diam sit justo amet ipsum vero ipsum clita lorem
                          </p> */}
            </div>
            <div className="col-lg-6 text-center text-lg-start">
              <img className="img-fluid" src="" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="searchModal" tabIndex="-1">
        <div className="modal-dialog modal-fullscreen">
          <div
            className="modal-content"
            style={{ backgroundColor: "rgba(29, 29, 39, 0.7)" }}
          >
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn bg-white btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex align-items-center justify-content-center">
              <div className="input-group" style={{ maxWidth: "600px" }}>
                <input
                  type="text"
                  className="form-control bg-transparent border-light p-3"
                  placeholder="Type search keyword"
                />
                <button className="btn btn-light px-4">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );



  const LeaveEventHandler=async (e,event)=> {
    e.preventDefault();
    const Id=localStorage.getItem("Id");
    await fetch(
      `${process.env.REACT_APP_API_URL}/events/${event._id}/${Id}/leave`,
      { method: "DELETE" }
    );
    toast.success(`You have just left the event ${event.title}`);
    window.location.reload();
  }

  return (
    <div>
      {NavBarUser}
      <Toaster position="top-center" reverseOrder={false} />
      {events && events.length > 0 ? (
        events.map((event) => (
          <ListGroup key={event._id}>
            {" "}
            {/* add key prop here */}
            <ListGroupItem>
              <img
                src={process.env.PUBLIC_URL + `/img/${event.img}`}
                alt={"img"}
                className="mr-3"
                width={64}
                height={64}
              />
              <div className="d-flex w-50 justify-content-between">
                <h5 className="mb-1">Event Title: {event.title}</h5>
              </div>
              <p className="mb-1">Event Description: {event.description}</p>
              <p className="mb-1">Event Location: {event.location}</p>
              <div
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
              <button
                class="btn btn-primary btn-icon-split"
                onClick={(e) => LeaveEventHandler(e, event)}
              >
                <span class="icon text-white-50">
                  <i class="fas fa-info-circle"></i>
                </span>
                <span class="text">Leave Event</span>
              </button>
              </div>
            </ListGroupItem>
          </ListGroup>
        ))
      ) : (
        <div className="container-fluid">
          <div className="text-center" style={{ marginTop: "90px" }}>
            <div className="error mx-auto" data-text="404">
              404
            </div>
            <p className="lead text-gray-800 mb-5">No Events Found</p>
            <p className="text-gray-500 mb-0">
              it looks like you haven't joined any events ...
            </p>
            <NavLink to="/EventsList">
              <a>&larr; Back to the list of events</a>
            </NavLink>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
