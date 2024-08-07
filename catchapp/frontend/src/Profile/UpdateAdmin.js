import React, { useEffect, useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import "../styles/Register.css";
import { format } from "date-fns";
import Sidebar from "../AdminDash/Sidebar";

export default function UpdateAdmin() {
  const [user, setUser] = useState(null);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [admin,setAdmin]=useState(null);
  const [adminFname,setAdminFname]=useState("");
  const [adminLname,setAdminLname]=useState("");
  const [profilePic,setProfilePic]=useState("");




  const sidebarRef = useRef(null);


  const handleButtonClick = () => {
    if (sidebarRef.current !== null) {
      sidebarRef.current.ChangeStyle1();
    }
  };




  const FetchAdmin=()=> {
    const AdminId=localStorage.getItem("Id")
    fetch(`${process.env.REACT_APP_API_URL}/users/${AdminId}`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setAdmin(data);
      });
  }

  const LogoutHandler=()=> {
    localStorage.removeItem("Ident");
    localStorage.removeItem("Id");
  }



  useEffect(() => {
    const ident=localStorage.getItem("Ident");
    if (ident) {
      FetchAdmin();
    fetch(`${process.env.REACT_APP_API_URL}/users/${ident}`, {
      method:"GET"
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => console.error(error));
    }
  }, []);


  useEffect(() => {
    if (admin) {
      setAdminFname(admin.fname);
      setAdminLname(admin.lname);
      setProfilePic(admin.profilePic);
    }
  }, [admin]);

  const UpdateUser =async  (e) => {
    e.preventDefault();
    const Nameregex = /^[A-Za-z\s]+$/;
    if (fname === "" || lname === "" || birthdate === "" || phone === "") {
      toast.error("Please fill all required fields");
      return;
    }
    if (!lname.match(Nameregex) || !fname.match(Nameregex)) {
      toast.error(
        "lname or fname should only contain letters or spaces"
      );
      return;
    }
    const ident=localStorage.getItem("Ident");
    await fetch(`${process.env.REACT_APP_API_URL}/users/updateAdmin/${ident}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fname,
            lname,
            phone,
            birthdate,
          }),
        });
        toast("User successfully updated !", {
            icon: "👏",
          });
  };



  useEffect(() => {
    if (user) {
      setFname(user.fname);
      setLname(user.lname);
      setPhone(user.phone);
      setBirthdate(format(new Date(user.birthdate), "yyyy-MM-dd"));
    }
  }, [user]);






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
            Spending Alert: We've noticed unusually high spending for your
            account.
          </div>
        </a>
        <a className="dropdown-item text-center small text-gray-500" href="#">
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
            <div className="small text-gray-500">Emily Fowler · 58m</div>
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
              I have the photos that you ordered last month, how would you
              like them sent to you?
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
            <div className="small text-gray-500">Morgan Alvarez · 2d</div>
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
              Am I a good boy? The reason I ask is because someone told me
              that people say this to all dogs, even if they aren't
              good...
            </div>
            <div className="small text-gray-500">Chicken the Dog · 2w</div>
          </div>
        </a>
        <a className="dropdown-item text-center small text-gray-500" href="#">
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
          {adminFname} {adminLname}
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
<br />
<br />
<br />
<br />
{user ? (
        <div>
          <div className="Container">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="title">Profile</div>
            <h2 className="detail">You can update the details</h2>
            <div className="user-details">
              <div className="input-box">
                <label>First Name</label>
                <input
                  type="text"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>
              <div className="input-box">
                <label>Last Name</label>
                <input
                  type="text"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>
              <div className="input-box">
                <label>Phone</label>
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="input-box">
                <label>Birthdate</label>
                <input
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </div>
            </div>
            <br />
            <button className="btn btn-info" onClick={UpdateUser}>
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <p className="Loading">
          dear Admin you should sign in again next time
        </p>
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
