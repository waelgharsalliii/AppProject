import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import NavBar from  '../components/NavBar';
import Footer from "../components/Footer";


const Reset = () => {

    const navigate=useNavigate();


    const RetrievePassword=async (e) => {
        e.preventDefault();
        await fetch(`${process.env.REACT_APP_API_URL}/users/forgot-password`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
        toast("Please check your email");  
        setTimeout(() => navigate("/Login"), 3000);
    }

    const CancelRetrieve=(e)=> {
        e.preventDefault();
        navigate("/Login");
    }


    const [email,setEmail]=useState("");

  return (
    <div>
      <NavBar></NavBar>
    <div className="Container">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="title">Password Retrieval Form</div>
      <br />
      <form>
        <div className="user-details">
          <div className="input-box">
            <label className="details">
              Email<ion-icon name="mail-outline"></ion-icon>
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email@gmail.com"
              required
            />
          </div>
          </div>
          <button className="btn btn-success" onClick={RetrievePassword}>Retrieve Password</button>
          <button onClick={CancelRetrieve} className="btn btn-danger">Cancel</button>
          </form>
          </div>
          <Footer />
          </div>
  )
};

export default Reset;
