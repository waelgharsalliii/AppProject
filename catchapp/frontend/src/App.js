import "./App.css";

import Spinner from "./components/Spinner";
import { React, useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./SignUp/Register";
import Login from "./SignIn/Login";
import Profile from "./Profile/Profile";
import Reset from "./SignIn/Reset";
import Users from "./SignIn/Users";
import Home from "./components/Home";
import Nav from "./Nav/Nav";
import UpdateAdmin from "./Profile/UpdateAdmin";
import AdminDash from "./AdminDash/AdminDash";
import NotFound from "./components/NotFound";
import AddClub from "./Club/AddClub";
import ClubList from "./Club/ClubList";
import UpdateClub from "./Club/UpdateClub";
import ClubMembers from "./Club/ClubMembers";
import Clubs from "./Club/User/Clubs";
import ValidatePayment from "./Club/User/ValidatePayment";
import MyClubs from "./Club/User/MyClubs";
import AddEvent from "./Event/AddEvent";
import EventList from "./Event/EventList";
import UpdateEvent from "./Event/UpdateEvent";
import Attendees from "./Event/Attendees";
import Events from "./Event/User/Events";
import MyEvents from "./Event/User/MyEvents";
import EventDetails from "./Event/User/EventDetails";
import Charts from "./Charts/Charts";
import Chatbot from "./chatbot";
import QrCode from "./Event/User/QrCode";
import Chatroom from "./Club/User/Chatroom";

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  }, []);

  return (
    <div className="container-xxl bg-white p-0">
      {loaded ? (
        <> <Chatbot/>
        
          <Routes>
            <Route exact path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/User" element={<Nav />}></Route>
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Update" element={<UpdateAdmin/>}></Route>
            <Route path="/Reset" element={<Reset />}></Route>
            <Route path="/users" element={<Users />}></Route>
            <Route path="/Dash" element={<AdminDash />}></Route>
            <Route path="/AddClub" element={<AddClub/>}></Route>
            <Route path="/Clubs" element={<ClubList />}></Route>
            <Route path="/UpdateClub" element={<UpdateClub />} />
            <Route  path="/ClubMembers" element={<ClubMembers />} />
            <Route  path="/payment" element={<Clubs />} />
            <Route path="/ValidatePayment" element={<ValidatePayment />} />
            <Route path="/ValidateEvent" element={<QrCode />} />
            <Route path="/MyClubs" element={<MyClubs />} />
            <Route  path="/AddEvent" element={<AddEvent />} />
            <Route path="/Events" element={<EventList />} />
            <Route path="/EventDetails" element={<EventDetails />} />
            <Route path="/ValidateEvtPayment" element={<QrCode />} />
            <Route  path="/UpdateEvent" element={<UpdateEvent />} />
            <Route path="/Attendees" element={<Attendees />} />
            <Route path="/EventsList" element={<Events />} /> 
            <Route path="/MyEvents" element={<MyEvents />} />
           <Route path="/Charts" element={<Charts />} /> 
           <Route path="/Chatroom" element={<Chatroom />} />
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
          {/* <About/> */}
          {/* <New></New> */}
          {/* <Service></Service> */}
          {/* <Portfolio></Portfolio>
          <Testimonial></Testimonial>
          <Team></Team> */}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default App;
