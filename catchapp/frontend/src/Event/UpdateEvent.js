import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "../AdminDash/Sidebar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { format } from "date-fns";
import { useRef } from "react";

export default function UpdateEvent() {
  const [utilisateur, setUtilisateur] = useState([]);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [location, setLocation] = useState("");
  const [fee, setFee] = useState("");
  const [numPlaces,setNumPlaces]=useState("");
  const [organizer,setOrganizer]=useState("");
  const [clubs, setClubs] = useState([]);
  const [event,setEvent]=useState(null);
  const navigate=useNavigate();
  const EventId=localStorage.getItem("EventId"); 
  const [img,setImg]=useState("");



  const sidebarRef = useRef(null);


  const handleButtonClick = () => {
    if (sidebarRef.current !== null) {
      sidebarRef.current.ChangeStyle1();
    }
  };








  const LogoutHandler = () => {
    localStorage.removeItem("Id");
  };


  useEffect(() => {
    const fetchEvent = async () => { 
      const response = await fetch(`${process.env.REACT_APP_API_URL}/events/${EventId}`,{
        method:"GET"
      });
      const data = await response.json();
      setEvent(data);
    };
    fetchEvent();
  }, []);

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setStart(format(new Date(event.start), "yyyy-MM-dd'T'HH:mm:ss"));
      setEnd(format(new Date(event.end), "yyyy-MM-dd'T'HH:mm:ss"));
      setLocation(event.location);
      setFee(event.fee);
      setNumPlaces(event.numPlaces);
      setOrganizer(event.organizer);
    }
  }, [event]);



  const FetchClubs = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/clubs`);
    const data = await response.json();
    if (data) {
      setClubs(data);
    }
  };


  useEffect(() => {
    if (!clubs || clubs.length === 0) {
      FetchClubs();
    }
  }, []);

  useEffect(() => {
    const Id = localStorage.getItem("Id");
    fetch(`${process.env.REACT_APP_API_URL}/users/${Id}`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setUtilisateur(data);
      });
  }, []);

  useEffect(() => {
    if (utilisateur) {
      setFname(utilisateur.fname);
      setLname(utilisateur.lname);
      setProfilePic(utilisateur.profilePic);
    }
  }, [utilisateur]);


  const UpdateEventHandler=async (e)=> {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("start", start);
    formData.append("end", end);
    formData.append("fee", fee);
    formData.append("numPlaces", numPlaces);
    formData.append("organizer", organizer);
    if (img) {
      formData.append("img", img, img.name);
    }
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/events/${EventId}`, {
          method: "PUT",
          body:formData,
        });
    
    
        if (!response.ok) {
          throw new Error("Failed to update event");
        }
        toast.success("Event Updated");
        localStorage.removeItem("EventId");
        setTimeout(() => navigate("/Events"), 2000);
      } catch (error) {
        console.error(error);
        toast.error("Failed to update event");
      }
  }



  const CancelHandler=(e)=> {
    e.preventDefault();
    localStorage.removeItem("EventId");
    navigate("/Events");
  }


  const NavBarUser = (
    <div id="content-wrapper" className="d-flex flex-column">
      <Toaster position="top-center" reverseOrder={false} />
      <div id="content">
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          <button
            id="sidebarToggleTop"
            className="btn btn-link d-md-none rounded-circle mr-3"
            onClick={handleButtonClick}
          >
            <i className="fa fa-bars"></i>
          </button>

          <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div className="input-group">
              <input
                type="text"
                className="form-control bg-light border-0 small"
                placeholder="Search for..."
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">
                  <i className="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown no-arrow d-sm-none">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="searchDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-search fa-fw"></i>
              </a>

              <div
                className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                aria-labelledby="searchDropdown"
              >
                <form className="form-inline mr-auto w-100 navbar-search">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control bg-light border-0 small"
                      placeholder="Search for..."
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>

            <li className="nav-item dropdown no-arrow mx-1">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="alertsDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-bell fa-fw"></i>

                <span className="badge badge-danger badge-counter">3+</span>
              </a>

              <div
                className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="alertsDropdown"
              >
                <h6 className="dropdown-header">Alerts Center</h6>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="mr-3">
                    <div className="icon-circle bg-primary">
                      <i className="fas fa-file-alt text-white"></i>
                    </div>
                  </div>
                  <div>
                    <div className="small text-gray-500">December 12, 2019</div>
                    <span className="font-weight-bold">
                      A new monthly report is ready to download!
                    </span>
                  </div>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="mr-3">
                    <div className="icon-circle bg-success">
                      <i className="fas fa-donate text-white"></i>
                    </div>
                  </div>
                  <div>
                    <div className="small text-gray-500">December 7, 2019</div>
                    $290.29 has been deposited into your account!
                  </div>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="mr-3">
                    <div className="icon-circle bg-warning">
                      <i className="fas fa-exclamation-triangle text-white"></i>
                    </div>
                  </div>
                  <div>
                    <div className="small text-gray-500">December 2, 2019</div>
                    Spending Alert: We've noticed unusually high spending for
                    your account.
                  </div>
                </a>
                <a
                  className="dropdown-item text-center small text-gray-500"
                  href="#"
                >
                  Show All Alerts
                </a>
              </div>
            </li>

            <li className="nav-item dropdown no-arrow mx-1">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="messagesDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-envelope fa-fw"></i>

                <span className="badge badge-danger badge-counter">7</span>
              </a>

              <div
                className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="messagesDropdown"
              >
                <h6 className="dropdown-header">Message Center</h6>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="dropdown-list-image mr-3">
                    <img
                      className="rounded-circle"
                      src="img-admin/undraw_profile_1.svg"
                      alt="..."
                    />
                    <div className="status-indicator bg-success"></div>
                  </div>
                  <div className="font-weight-bold">
                    <div className="text-truncate">
                      Hi there! I am wondering if you can help me with a problem
                      I've been having.
                    </div>
                    <div className="small text-gray-500">
                      Emily Fowler · 58m
                    </div>
                  </div>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="dropdown-list-image mr-3">
                    <img
                      className="rounded-circle"
                      src="img-admin/undraw_profile_2.svg"
                      alt="..."
                    />
                    <div className="status-indicator"></div>
                  </div>
                  <div>
                    <div className="text-truncate">
                      I have the photos that you ordered last month, how would
                      you like them sent to you?
                    </div>
                    <div className="small text-gray-500">Jae Chun · 1d</div>
                  </div>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="dropdown-list-image mr-3">
                    <img
                      className="rounded-circle"
                      src="img-admin/undraw_profile_3.svg"
                      alt="..."
                    />
                    <div className="status-indicator bg-warning"></div>
                  </div>
                  <div>
                    <div className="text-truncate">
                      Last month's report looks great, I am very happy with the
                      progress so far, keep up the good work!
                    </div>
                    <div className="small text-gray-500">
                      Morgan Alvarez · 2d
                    </div>
                  </div>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="dropdown-list-image mr-3">
                    <img
                      className="rounded-circle"
                      src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                      alt="..."
                    />
                    <div className="status-indicator bg-success"></div>
                  </div>
                  <div>
                    <div className="text-truncate">
                      Am I a good boy? The reason I ask is because someone told
                      me that people say this to all dogs, even if they aren't
                      good...
                    </div>
                    <div className="small text-gray-500">
                      Chicken the Dog · 2w
                    </div>
                  </div>
                </a>
                <a
                  className="dropdown-item text-center small text-gray-500"
                  href="#"
                >
                  Read More Messages
                </a>
              </div>
            </li>

            <div className="topbar-divider d-none d-sm-block"></div>

            <li className="nav-item dropdown no-arrow">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                  {fname} {lname}
                </span>
                <img
                  className="img-profile rounded-circle"
                  src={`img/${profilePic}`}
                />
              </a>

              <div
                className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown"
              >
                <NavLink to="/users" className="dropdown-item">
                  <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                  Manage Users
                </NavLink>
                <a className="dropdown-item" href="#">
                  <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                  Settings
                </a>
                <a className="dropdown-item" href="#">
                  <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                  Activity Log
                </a>
                <div className="dropdown-divider"></div>
                <NavLink
                  className="dropdown-item"
                  to="/Login"
                  data-toggle="modal"
                  data-target="#logoutModal"
                  onClick={LogoutHandler}
                >
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Logout
                </NavLink>
              </div>
            </li>
          </ul>
        </nav>
        <div className="event-container">
          <h2 className="event-title">Update an Event</h2>
          <Form className="EventForm" onSubmit={UpdateEventHandler}>
            <Form.Group className="mb-3">
              <Form.Label className="EventLabel">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Event Title"
                className="EventControl"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="EventLabel">Description</Form.Label>
              <textarea
                type="text"
                placeholder="Write a brief description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="EventLabel">startDate</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder="Enter Event startDate"
                className="EventControl"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="EventLabel">endDate</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder="Enter Event endDate"
                className="EventControl"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="EventLabel">Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Event Location"
                className="EventControl"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="EventLabel">Fee</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Event Fee"
                className="EventControl"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="EventLabel">NbrPlaces</Form.Label>
              <Form.Control
                type="number"
                placeholder="NbrPlaces"
                className="EventControl"
                value={numPlaces}
                onChange={(e) => setNumPlaces(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="EventLabel">Organizer</Form.Label>
              <select
                className="EventControl"
                onChange={(e) => setOrganizer(e.target.value)}
                value={organizer}
              >
                <option value="0">Select Organizer</option>
                {clubs.map((club) => (
                  <option key={club._id} value={club._id}>
                    {club.name}
                  </option>
                ))}
              </select>
            </Form.Group>
            
            <Form.Group className="mb-3">
            <Form.Label className="EventLabel">Img</Form.Label>
              <input
                type="file"
                accept="image/*"
                onChange={(e)=>setImg(e.target.files[0])}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="EventButton">
              Submit
            </Button>
            <button className="btn btn-danger" style={{position:"relative",left:"20px"}} onClick={CancelHandler}>Cancel</button>
          </Form>
        </div>
      </div>
    </div>
  );

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar  ref={sidebarRef} />
        {NavBarUser}
      </div>
    </div>
  );
}
