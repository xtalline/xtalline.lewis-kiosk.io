import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "../assets/styles/log.css";
import "../assets/styles/app.css";

import { IoChevronForwardOutline } from 'react-icons/io5';
import { HiHome } from "react-icons/hi";
import TimeRangePicker from "../components/TimeRangePicker";



const TimeRange = () => {
    const [fetchError, setFetchError] = useState(null);
    const { activityName, roomNumber, roomName, id, departmentName, statusName } = useParams()


    const navigate = useNavigate();
    const navigateHome = () => {
        navigate('/')
    }
    const navigateDepartment = () => {
        navigate('/kiosk-log/departments')
    }
    const navigateInstructor = () => {
        navigate('/' + departmentName + '/instructors')
    }
    const navigateRoom = () => {
        navigate('/' + departmentName + '/user/' + id + '/rooms')
    }
    const navigateActivity = () => {
        navigate('/' + departmentName + '/' + id + "/" + roomNumber + '/' +  roomName + '/activities')
    }
    const navigateStatus = () => {
        navigate('/' + departmentName + '/' + id + "/" + roomNumber + '/' + roomName + '/' + activityName + '/status')
    }

    return(
    <>
    <div className="log-header-wrapper">
        <div className="log-header-links">
            <HiHome className="home" size={25} onClick={navigateHome} />
            <IoChevronForwardOutline size={20} />
            <h3 onClick={navigateDepartment}>Departments</h3>
            <IoChevronForwardOutline size={20} />
            <h3 onClick={navigateInstructor}>Instructors</h3>
            <IoChevronForwardOutline size={20} />
            <h3 onClick={navigateRoom}>Rooms</h3>
            <IoChevronForwardOutline size={20} />
            <h3 onClick={navigateActivity}>Activities</h3>
            <IoChevronForwardOutline size={20} />
            <h3 onClick={navigateStatus}>Status</h3>
            <IoChevronForwardOutline size={20} />
            <h3>Time Range</h3>
        </div>
    </div>
    <div className="title-wrapper">
        <h1>TIME YOU'RE GOING TO SPEND</h1>
    </div>
    <div className="time-range-picker-wrapper">
        <TimeRangePicker
            statusName={statusName}
            activityName={activityName}
            id={id}
            roomName={roomName}
            roomNumber={roomNumber}
            departmentName={departmentName}/>
    </div>
    </>
)
}
export default TimeRange;