import React, { useRef } from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";

export default function AdminDash() {


  const sidebarRef = useRef(null);


  const handleButtonClick = () => {
    if (sidebarRef.current !== null) {
      sidebarRef.current.ChangeStyle1();
    }
  };

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar ref={sidebarRef}></Sidebar>
        <Content onButtonClick={handleButtonClick} />
      </div>
    </div>
  );
}
