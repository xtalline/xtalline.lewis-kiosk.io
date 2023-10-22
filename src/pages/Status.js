import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { HiHome } from "react-icons/hi";
import supabase from "../config/supabaseClient";

import "../assets/styles/log.css";
import "../assets/styles/app.css";
import StatusCard from "../components/StatusCard";

const Status = () => {
    const [fetchError, setFetchError] = useState(null);
    const [status, setStatus] = useState(null);
    const { activityName, roomNumber, roomName, id, departmentName } = useParams()

    useEffect(() => {
        const fetchStatus = async () => {
            const { data, error } = await supabase.from("status").select();

            if (error) {
                setFetchError("Could not fetch the data!");
                setStatus(null);
            } else if (data) {
                setStatus(data);
                setFetchError(null);
            }
        };
        fetchStatus();
    }, []);

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
        navigate('/' + departmentName + '/' + id + '/' + roomNumber + '/' + roomName + '/activities')
    }

    return (
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
                    <h3>Status</h3>
                </div>
            </div>
            <div className="title-wrapper">
                <h1>STATUS</h1>
            </div>
            <div className="card-container">
                <div className="card-grid">
                    {fetchError && (<p>{fetchError}</p>)}
                    {status && (
                        <>
                            {status.map(status => (
                                <StatusCard
                                    key={status.statusID}
                                    status={status}
                                    activityName={activityName}
                                    id={id}
                                    roomName={roomName}
                                    roomNumber={roomNumber}
                                    departmentName={departmentName} />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
export default Status;