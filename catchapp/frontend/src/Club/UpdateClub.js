import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

export default function UpdateClub() {
  const ClubId = localStorage.getItem("ClubId");
  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [domain, setDomain] = useState("");
  const [club, setClub] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchClub = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/clubs/${ClubId}`);
      const data = await response.json();
      setClub(data);
    };
    fetchClub();
  }, []);

  useEffect(() => {
    if (club) {
      setLogo(club.logo);
      setDescription(club.description);
      setName(club.name);
      setAddress(club.address);
      setDomain(club.domain);
    }
  }, [club]);

  const handleLogoChange = (event) => {
    setLogo(event.target.files[0]);
  };

  const ClubFormHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("domain", domain);
    if (logo) {
      formData.append("logo", logo, logo.name);
    }
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/clubs/update/${ClubId}`,
      {
        method: "PUT",
        body: formData,
      }
    );
    if (response.ok) {
      toast.success("Club Updated");
    } else {
      console.error(
        `Failed to update club: ${response.status} ${response.statusText}`
      );
    }
  };


  const CancelHandler=(e)=> {
    e.preventDefault();
    localStorage.removeItem("ClubId");
    navigate("/Clubs");
  }

  return (
    <div className="bg-gradient-primary">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            {/* <!-- Nested Row within Card Body --> */}
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block">
                <img
                  src={process.env.PUBLIC_URL + `/img/${logo}`}
                  alt="logo"
                  width={400}
                  style={{marginLeft:"20px",marginTop:"20px"}}
                />
              </div>
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Update a Club!</h1>
                  </div>
                  <form className="user" onSubmit={ClubFormHandler}>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="exampleFirstName"
                          placeholder="Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="exampleLastName"
                          placeholder="Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-user"
                        id="exampleInputEmail"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-user"
                        id="exampleInputEmail"
                        placeholder="Domain"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                      />
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <label>Logo</label>
                        <input
                          type="file"
                          id="exampleInputPassword"
                          placeholder="Logo"
                          onChange={handleLogoChange}
                        />
                      </div>
                    </div>
                    <hr />
                    <button
                      type="submit"
                      className="btn btn-primary btn-user btn-block"
                    >
                      Update
                    </button>
                    <hr />
                    <NavLink to="/Clubs">
                      <button className="btn btn-google btn-user btn-block" onClick={CancelHandler}>
                        Cancel
                      </button>
                    </NavLink>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
