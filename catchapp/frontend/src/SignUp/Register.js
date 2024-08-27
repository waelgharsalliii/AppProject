import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Register.css";
import toast, { Toaster } from "react-hot-toast";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  const handleProfilePicChange = (event) => {
    setProfilePic(event.target.files[0]);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      email === "" ||
      fname === "" ||
      lname === "" ||
      birthdate === "" ||
      password === "" ||
      phone === "" ||
      profilePic === null
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const Nameregex = /^[A-Za-z\s]+$/;
    const Passregex = /^[a-zA-Z0-9]*$/;
    if (!lname.match(Nameregex) || !fname.match(Nameregex)) {
      toast.error("lname or fname should only contain letters or spaces");
      return;
    }
    if (!password.match(Passregex)) {
      toast.error("Password should only contain letters or numbers");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("birthdate", birthdate);
    formData.append("phone", phone);
    if (profilePic) {
      formData.append("profilePic", profilePic, profilePic.name);
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/signup`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      toast.success("Registered successfully");
      setTimeout(() => navigate("/Login"), 2000);
    } catch (error) {
      toast.error(error.message);
    }
  };

return (
    <div>
      <NavBar></NavBar>
      <div className="Container">
        <div className="title">Registration</div>
        <Toaster position="top-center" reverseOrder={false} />
        <br />
        <form onSubmit={handleSubmit}>
          <div className="user-details">
            <div className="input-box">
              <label className="details">FirstName</label>
              <input
                value={fname}
                placeholder="firstname"
                id="firstname"
                type="text"
                name="firstname"
                onChange={(e) => setFname(e.target.value)}
              />
            </div>
            <div className="input-box">
              <label className="details">LastName</label>
              <input
                value={lname}
                placeholder="lastname"
                id="lastname"
                type="text"
                name="lastname"
                onChange={(e) => setLname(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label className="details">Birthdate</label>
              <input
                value={birthdate}
                type="date"
                id="birthdate"
                name="birthdate"
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </div>
            <div className="input-box">
              <label className="details">Phone</label>
              <input
                value={phone}
                placeholder="phone"
                type="number"
                id="phone"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="input-box">
              <label className="details">
                Email<ion-icon name="mail-outline"></ion-icon>
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="email@gmail.com"
                id="email"
                name="email"
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{fontWeight:"500" }}>Profile Picture</label>
              <div style={{ position: "relative" }}>
                <input
                  type="file"
                  id="profile-pic"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  style={{marginTop:"10px"}}
                />
                <div
                  style={{
                    backgroundColor: "#eee",
                    width: "px",
                    height: "0px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                ></div>
              </div>
            </div>

            <div className="input-box" style={{ position: "relative" }}>
              <label className="details">Password</label>
              <input
                value={password}
                onChange={(e) => setPass(e.target.value)}
                type={passwordVisible ? "text" : "password"}
                placeholder="***********"
                id="password"
                name="password"
              />

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  top: "70%",
                  right: "2px",
                  transform: "translateY(-50%)",
                }}
              >
                {passwordVisible ? (
                  <i className="bi bi-eye-fill"></i>
                ) : (
                  <i className="bi bi-eye-slash-fill"></i>
                )}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-info">
            Register
          </button>
        </form>
        <div className="Login">
          <div>Already have an account?</div>
          <NavLink to="/Login">
            <button className="btn btn-primary">Login here</button>
          </NavLink>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
