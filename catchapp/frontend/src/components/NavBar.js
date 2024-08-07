import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Register.css";


const NavBar = () => {
  return (
    <div className="container-xxl position-relative p-0">
     <nav id="navbar" className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
        <div  className="navbar-brand">
          <img src="img/logo.png" alt="logo"  className="navbar-logo" />
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
            <a href="" className="nav-item nav-link">
              Service
            </a>
            <a href="" className="nav-item nav-link">
              Project
            </a>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Pages
              </a>
              <div className="dropdown-menu m-0">
                <a href="" className="dropdown-item">
                  Our Team
                </a>
                <a href="" className="dropdown-item">
                  Testimonial
                </a>
                <a href="" className="dropdown-item">
                  404 Page
                </a>
              </div>
            </div>
            <a href="" className="nav-item nav-link">
              Contact
            </a>
          </div>
          <button
            type="button"
            className="btn text-secondary ms-3"
            data-bs-toggle="modal"
            data-bs-target="#searchModal"
          >
            <i className="fa fa-search"></i>
          </button>
          <NavLink    to="/Register"
            className="btn btn-secondary text-light rounded-pill py-2 px-4 ms-3"
            style={{backgroundColor:"#4777F5",border:"none"}}
          >
           Sign Up
          </NavLink>
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
              <NavLink
                to="/Register"
                className="btn btn-light py-sm-3 px-sm-5 rounded-pill me-3 animated slideInLeft"
              >
               Sign Up Now
              </NavLink>
              <NavLink
                to="/Login"
                className="btn btn-outline-light py-sm-3 px-sm-5 rounded-pill animated slideInRight"
              >
                Sign In
              </NavLink>
            </div>
            <div className="col-lg-6 text-center text-lg-start">
              <img className="img-fluid" src="" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="searchModal" tabIndex="-1">
            <div className="modal-dialog modal-fullscreen">
                <div className="modal-content" style={{backgroundColor: "rgba(29, 29, 39, 0.7)"}}>
                    <div className="modal-header border-0">
                        <button type="button" className="btn bg-white btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body d-flex align-items-center justify-content-center">
                        <div className="input-group" style={{maxWidth: "600px"}}>
                            <input type="text" className="form-control bg-transparent border-light p-3" placeholder="Type search keyword" />
                            <button className="btn btn-light px-4"><i className="bi bi-search"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default NavBar;
