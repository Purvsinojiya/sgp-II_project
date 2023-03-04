import React from "react";
import { Outlet } from "react-router-dom";
import Prenavbar from "./Prenavbar";
import Nav from "./nav";

function outerlayout() {
  return (
    <>
       <Prenavbar />
      <Nav />
      <Outlet />
    </>
  );
}

export default outerlayout;
