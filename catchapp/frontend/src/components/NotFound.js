import React from "react";
import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div id="page-top">
      {/* <!-- Page Wrapper --> */}
      <div id="wrapper">
        {/* <!-- Sidebar --> */}
        <ul
          className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          {/* <!-- Sidebar - Brand --> */}
          <a
            className="sidebar-brand d-flex align-items-center justify-content-center"
            href="index.html"
          >
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink"></i>
            </div>
            <div className="sidebar-brand-text mx-3">
            Catchapp
            </div>
          </a>

          {/* <!-- Divider --> */}
          <hr className="sidebar-divider my-0" />

          {/* <!-- Nav Item - Dashboard --> */}
          <NavLink className="nav-item active" to="/Home">
            <a className="nav-link">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>Home</span>
            </a>
          </NavLink>

          {/* <!-- Nav Item - Pages Collapse Menu --> */}
          <li className="nav-item active">
            <a
              className="nav-link"
              href="#"
              data-toggle="collapse"
              data-target="#collapsePages"
              aria-expanded="true"
              aria-controls="collapsePages"
            >
              <i className="fas fa-fw fa-folder"></i>
              <span>Pages</span>
            </a>
            <div
              id="collapsePages"
              className="collapse show"
              aria-labelledby="headingPages"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Login Screens:</h6>
                <NavLink to="/Login">
                <a className="collapse-item" >
                  Login
                </a>
                </NavLink>
                <NavLink to="/Register">
                <a className="collapse-item">
                  Register
                </a>
                </NavLink>
                <NavLink to="/Reset">
                <a className="collapse-item">
                  Forgot Password
                </a>
                </NavLink>
              </div>
            </div>
          </li>
        </ul>
        {/* <!-- End of Sidebar --> */}

        {/* <!-- Content Wrapper --> */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* <!-- Main Content --> */}
          <div id="content">
            {/* <!-- Topbar --> */}
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              {/* <!-- Sidebar Toggle (Topbar) --> */}
              <button
                id="sidebarToggleTop"
                className="btn btn-link d-md-none rounded-circle mr-3"
              >
                <i className="fa fa-bars"></i>
              </button>

              {/* <!-- Topbar Search --> */}
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

              {/* <!-- Topbar Navbar --> */}
              <ul className="navbar-nav ml-auto">
                {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
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
                  {/* <!-- Dropdown - Messages --> */}
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
              </ul>
            </nav>
            {/* <!-- End of Topbar --> */}

            <br />
            <br />
            <br />
            <br />
            {/* <!-- Begin Page Content --> */}
            <div className="container-fluid">
              {/* <!-- 404 Error Text --> */}
              <div className="text-center">
                <div className="error mx-auto" data-text="404">
                  404
                </div>
                <p className="lead text-gray-800 mb-5">Page Not Found</p>
                <p className="text-gray-500 mb-0">
                  It looks like you found a glitch in the matrix...
                </p>
                <NavLink to="/Home">
                <a>&larr; Back to Home</a>
                </NavLink>
              </div>
            </div>
            {/* <!-- /.container-fluid --> */}
          </div>
          {/* <!-- End of Main Content --> */}

          {/* <!-- Footer --> */}
          <div className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright &copy; Your Website 2020</span>
              </div>
            </div>
          </div>
          {/* <!-- End of Footer --> */}
        </div>
        {/* <!-- End of Content Wrapper --> */}
      </div>

      {/* <!-- End of Page Wrapper --> */}

    </div>
  );
}
