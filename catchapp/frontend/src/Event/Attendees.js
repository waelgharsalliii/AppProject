import React, { useEffect, useRef, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import Sidebar from '../AdminDash/Sidebar';
import { format } from "date-fns";

export default function Attendees() {


  const [attendees, setAttendees] = useState([]);
  const [nbrattendees, setNbrAttendees]=useState(null);
  const [utilisateur, setUtilisateur] = useState([]);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const EventId = localStorage.getItem("EventId");
  const navigate=useNavigate();





  const sidebarRef = useRef(null);


  const handleButtonClick = () => {
    if (sidebarRef.current !== null) {
      sidebarRef.current.ChangeStyle1();
    }
  };






    const LogoutHandler = () => {
        localStorage.removeItem("Id");
      };


      const fetchData = async () => {
        try {
          await fetch(`${process.env.REACT_APP_API_URL}/events/${EventId}/attendees`,{
            method:"GET"
          }).then((response)=> response.json())
          .then((data)=>
          setAttendees(data))
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      
      


    useEffect(() => {
        if (!attendees || attendees.length===0) {
            fetchData();
        }
      }, []);


    useEffect(()=> {
      const fetchNbr=async ()=> {
        try {
         await fetch(`${process.env.REACT_APP_API_URL}/events/${EventId}/attendees/count`,{
            method:"GET"
          }).then((response)=> response.json())
          .then((data)=>{
            setNbrAttendees(data.count)})
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      fetchNbr();
    },[])  

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
          {attendees && attendees.length > 0 ? (
            <div>
            <div className="container-fluid">
            <div className="text-center" style={{ marginTop: "90px" }}>
              <div className="error mx-auto" data-text={nbrattendees}>
                {nbrattendees}
              </div>
              <p className="lead text-gray-800 mb-5">Attendees Found</p>
            </div>
          </div>
            <div className="table-container">
              <Toaster position="top-center" reverseOrder={false} />
              <table>
                <thead>
                  <tr>
                    <th className="details">FirstName</th>
                    <th className="details">LastName</th>
                    <th className="details">Email</th>
                    <th className="details">Phone</th>
                    <th className="details">birthdate</th>
                  </tr>
                </thead>
                <tbody>
                  {attendees.map((user) => (
                    <tr>
                      <td>{user.fname}</td>
                      <td>{user.lname}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{format(new Date(user.birthdate), "yyyy-MM-dd")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className='btn btn-danger' style={{marginTop:"10px"}} onClick={CancelHandler}>Cancel</button>
            </div>
            </div>
          ) : (
            <div className="container-fluid">
              <div className="text-center" style={{ marginTop: "90px" }}>
                <div className="error mx-auto" data-text="404">
                  404
                </div>
                <p className="lead text-gray-800 mb-5">No Attendees Found</p>
                <p className="text-gray-500 mb-0">
                  It looks like you should add some Attendees...
                </p>
                <a
                href=''
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem("EventId");
                    navigate("/Dash");
                  }}
                >
                  &larr; Back to Dashboard
                </a>
              </div>
            </div>
          )}
            </div>
            </div>)


  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar ref={sidebarRef} />
        {NavBarUser}
      </div>
    </div>
  );
}

