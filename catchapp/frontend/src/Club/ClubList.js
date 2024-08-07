import React, { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { toast, Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "../AdminDash/Sidebar";
import "../styles/Register.css";
import { useRef } from "react";

export default function ClubList() {
  const [clubs, setClubs] = useState([]);
  const [utilisateur, setUtilisateur] = useState([]);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();





  const sidebarRef = useRef(null);


  const handleButtonClick = () => {
    if (sidebarRef.current !== null) {
      sidebarRef.current.ChangeStyle1();
    }
  };






  const FetchClubs = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/clubs`);
    const data = await response.json();
    if (data) {
      setClubs(data);
    }
  };

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

  useEffect(() => {
    if (!clubs || clubs.length === 0) {
      FetchClubs();
    }
  }, []);

  const LogoutHandler = () => {
    localStorage.removeItem("Id");
  };

  const DeleteClubHandler = async (e, club) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_API_URL}/clubs/delete/${club._id}`, {
      method: "DELETE",
    });
    window.location.reload();
    toast.success("Club deleted successfully", {
      duration: 3000,
    });
  };

  const UpdateClubHandler = async (e, club) => {
    e.preventDefault();
    localStorage.setItem("ClubId", club._id);
    navigate("/UpdateClub");
  };


  const ViewMembersHandler=async(e,club)=> {
    e.preventDefault();
    localStorage.setItem("ClubId", club._id);
    navigate("/ClubMembers");
  }

  const NavBarUser = (
    <div id="content-wrapper" className="d-flex flex-column">
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
        <Toaster position="top-center" reverseOrder={false} />
        {clubs && clubs.length > 0 ? (
          clubs.map((club) => (
            <div className="div1">
              <Card style={{ width: "18rem", marginRight: "10px" }}>
                <Card.Img
                  variant="top"
                  src={process.env.PUBLIC_URL + `/img/${club.logo}`}
                />
                <Card.Body>
                  <Card.Title>Club Name: {club.name}</Card.Title>
                  <Card.Text>Club Description: {club.description}</Card.Text>
                  <Card.Text>Club Address: {club.address}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={(e) => UpdateClubHandler(e, club)}
                  >
                    Update
                  </Button>
                  <button
                    class="btn btn-danger btn-circle"
                    style={{ marginLeft: "5px" }}
                    onClick={(e) => DeleteClubHandler(e, club)}
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                  <button  class="btn btn-secondary btn-icon-split" style={{marginTop:"5px"}} onClick={(e)=>ViewMembersHandler(e,club)}>
                    <span class="icon text-white-50">
                      <i class="fas fa-arrow-right"></i>
                    </span>
                    <span class="text">View Members</span>
                  </button>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <div className="container-fluid">
            <div className="text-center" style={{ marginTop: "90px" }}>
              <div className="error mx-auto" data-text="404">
                404
              </div>
              <p className="lead text-gray-800 mb-5">No Clubs Found</p>
              <p className="text-gray-500 mb-0">
                It looks like you should add some clubs...
              </p>
              <NavLink to="/Dash">
                <a>&larr; Back to Dashboard</a>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar ref={sidebarRef} />
        {NavBarUser}
      </div>
    </div>
  );
}
