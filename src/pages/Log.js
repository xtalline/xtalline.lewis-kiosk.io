import React from "react";

import "../assets/styles/log.css";
import "../assets/styles/app.css";

import { Routes, Route } from "react-router-dom";
import Rooms from "./Rooms";
import Instructors from "./Instructors";
import Activities from "./Activities";
import Confirmation from "./Confirmation";
import Departments from "./Departments";
import Status from "./Status";
import TimeRange from "./TimeRange";

const Log = () => {
  return (
    <>
      {/*<div className="kiosk-header-container">
        <div className="log-header-wrapper">
          <div className="log-header-links">
            <HiHome size={25}/>
            <IoChevronForwardOutline size={20}/>
            <h3>Departments</h3>
            <IoChevronForwardOutline size={20}/>
            <h3>Instructors</h3>
            <IoChevronForwardOutline size={20}/>
            <h3>Rooms</h3>
            <IoChevronForwardOutline size={20}/>
            <h3>Activities</h3>
            <IoChevronForwardOutline size={20}/>
            <h3>Confirm</h3>
          </div>
        </div>
  </div>*/}
      <div className="log-page-wrapper">
        <Routes>
          <Route path="/kiosk-log/departments" element={<Departments />}></Route>
          <Route path="/:departmentName/instructors" element={<Instructors />}></Route>
          <Route path="/:departmentName/user/:id/rooms" element={<Rooms />}></Route>
          <Route path="/:departmentName/:id/:roomNumber/:roomName/activities" element={<Activities />}></Route>
          <Route path="/:departmentName/:id/:roomNumber/:roomName/:activityName/status" element={<Status />}></Route>
          <Route path="/:departmentName/:id/:roomNumber/:roomName/:activityName/:statusName/time" element={<TimeRange />}></Route>
          <Route path="/:departmentName/:id/:roomNumber/:roomName/:activityName/:statusName/:timeRange/confirm" element={<Confirmation />}></Route>
        </Routes>
      </div>
    </>
  )
}


export default Log;