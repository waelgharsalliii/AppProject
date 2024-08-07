import React, { forwardRef, useImperativeHandle } from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/Register.css";
import { useState } from 'react';



const Sidebar=forwardRef((props, ref) => {


    const [style,setStyle]=useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");


    const ChangeStyle=()=> {
    if (style=="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
        setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
    }
    else {
        setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }
    }


    const ChangeStyle1=()=> {
        if (style=="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1");
        }
        else {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
        }
        }

    useImperativeHandle(ref, () => ({
        ChangeStyle1
      }));



  return (
    <div className='SideBar'>
        <ul className={style} id="accordionSidebar">

            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Catchapp</div>
            </a>

            <hr className="sidebar-divider my-0" />

            <NavLink className="nav-item active" to="/Dash">
                <a className="nav-link">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></a>
            </NavLink>

           
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                    aria-expanded="true" aria-controls="collapsePages">
                    <i className="fas fa-fw fa-folder"></i>
                    <span>Pages</span>
                </a>
                <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Login Screens:</h6>
                        <NavLink to="/Login" className="collapse-item">Login</NavLink>
                        <NavLink to="/Reset" className="collapse-item">Forgot Password</NavLink>
                        </div>
                </div>
            </li>

            
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                    aria-expanded="true" aria-controls="collapseUtilities">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Clubs</span>
                </a>
                <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Custom Clubs:</h6>
                        <NavLink to="/AddClub" className="collapse-item">Add a club</NavLink>
                        <NavLink to="/Clubs" className="collapse-item">View All Clubs</NavLink>
                    </div>
                </div>
            </li>

            
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true"
                    aria-controls="collapseTwo">
                    <i className="fas fa-fw fa-table"></i>
                    <span>Events</span></a>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo"
                    data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Custom Events:</h6>
                        <NavLink className="collapse-item active" to="/AddEvent">Add an Event</NavLink>
                        <NavLink className="collapse-item" to="/Events">View All Events</NavLink>
                    </div>
                </div>
            </li>

            <li className="nav-item">
                <NavLink className="nav-link" to="/Charts">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Charts</span></NavLink>
            </li>

            
            <hr className="sidebar-divider d-none d-md-block" />

            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle"onClick={ChangeStyle} ></button>
            </div>

        </ul>
        </div>
  )
});


export default Sidebar;

