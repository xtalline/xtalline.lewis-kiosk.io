import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { HiHome } from "react-icons/hi";
import supabase from "../config/supabaseClient";

import "../assets/styles/log.css";

const Confirmation = () => {

    /** ensure one click for save button */
    const [openOverlay, setOpenOverlay]=useState(false);

    const { roomNumber, roomName, id, activityName, statusName, timeRange } = useParams();
    const navigate = useNavigate();
    const [instructorName, setInstructorName] = useState('');
    const [departmentName, setDepartmentName] = useState('');
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    const time = `${hours}:${minutes}:${seconds}`;
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();
    const date = `${year}-${month}-${day}`;

    useEffect(() => {
        const fetchInstructorName = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select()
                .eq('id', id)
                .single();

            if (data) {
                setInstructorName(`${data.firstname} ${data.lastname}`);
                setDepartmentName(data.departmentname);
            }
        };

        fetchInstructorName();
    }, [id]);

    const handleConfirm = async () => {
        setOpenOverlay(true)

        const { data: whereabouts, error: whereaboutsError } = await supabase
            .from('whereabouts')
            .update([{ roomName, roomNumber, activityName, time }])
            .eq('id', id)
            .select('*');

        const { data: profiles, error: profilesError } = await supabase
            .from('profiles')
            .update([{ status: statusName }])
            .eq('id', id)
            .select();

        if (whereabouts) {
            const { data, error } = await supabase
                .from('record')
                .insert([{ instructorName, roomName, roomNumber, departmentName, time, date, timeRange }])
                .select();
            navigate('/kiosk-whereabouts');
        }
    };

    const navigateHome = () => {
        navigate('/');
    };

    const navigateDepartment = () => {
        navigate('/kiosk-log/departments');
    };

    const navigateInstructor = () => {
        navigate(`/${departmentName}/instructors`);
    };

    const navigateRoom = () => {
        navigate(`/${departmentName}/user/${id}/rooms`);
    };

    const navigateActivity = () => {
        navigate(`/${departmentName}/${id}/${roomNumber}/${roomName}/activities`);
    };
    const navigateStatus = () => {
        navigate(`/${departmentName}/${id}/${roomNumber}/${roomName}/${activityName}/status`);
    };
    const navigateTimeRange = () => {
        navigate(`/${departmentName}/${id}/${roomNumber}/${roomName}/${activityName}/${statusName}/time`);
    };
    if (roomNumber !== 0) {
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
                        <h3 onClick={navigateStatus}>Status</h3>
                        <IoChevronForwardOutline size={20} />
                        <h3 onClick={navigateTimeRange}>Time Range</h3>
                        <IoChevronForwardOutline size={20} />
                        <h3>Confirm</h3>
                    </div>
                </div>
                <div className="log-confirmation-page">
                    <div className="confirm-header">
                        <h2>YOU'RE ABOUT TO UPDATE YOUR WHEREABOUTS</h2>
                        <p>Confirm your information</p>
                    </div>
                    <div className="confirm-info">
                        <div className="log-details">
                            <p>DEPARTMENT</p>
                            <p>:</p>
                            <p>{departmentName}</p>
                        </div>
                        <div className="log-details">
                            <p>NAME</p>
                            <p>:</p>
                            <p>{instructorName}</p>
                        </div>
                        <div className="log-details">
                            <p>ROOM NAME/LOCATION</p>
                            <p>:</p>
                            <p>{roomName}</p>
                        </div>
                        <div className="log-details">
                            <p>ROOM NUMBER</p>
                            <p>:</p>
                            <p>{roomNumber}</p>
                        </div>
                        <div className="log-details">
                            <p>ACTIVITY</p>
                            <p>:</p>
                            <p>{activityName}</p>
                        </div>
                        <div className="log-details">
                            <p>STATUS</p>
                            <p>:</p>
                            <p>{statusName}</p>
                        </div>
                        <div className="log-details">
                            <p>TIME TO SPEND</p>
                            <p>:</p>
                            <p>{timeRange}</p>
                        </div>
                    </div>
                    <div className="confirm-btn-container">
                        <button onClick={handleConfirm}>Submit</button>
                        <button onClick={navigateHome}>Cancel</button>
                    </div>
                </div>
                {openOverlay && (
                    <div className="one-click-overlay">
                        <p>Please wait...</p>
                    </div>
                )}
            </>
        )
    } else {
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
                        <h3>Confirm</h3>
                    </div>
                </div>
                <div className="log-confirmation-page">
                    <div className="confirm-header">
                        <h2>YOU'RE ABOUT TO UPDATE YOUR WHEREABOUTS</h2>
                        <p>Confirm your information</p>
                    </div>
                    <div className="confirm-info">
                        <div className="log-details">
                            <p>DEPARTMENT</p>
                            <p>:</p>
                            <p>{departmentName}</p>
                        </div>
                        <div className="log-details">
                            <p>NAME</p>
                            <p>:</p>
                            <p>{instructorName}</p>
                        </div>
                        <div className="log-details">
                            <p>ROOM/OFFICE</p>
                            <p>:</p>
                            <p>{roomName}</p>
                        </div>
                        <div className="log-details">
                            <p>ROOM NUMBER</p>
                            <p>:</p>
                            <p>{roomName}</p>
                        </div>
                        <div className="log-details">
                            <p>ACTIVITY</p>
                            <p>:</p>
                            <p>{activityName}</p>
                        </div>
                        <div className="log-details">
                            <p>STATUS</p>
                            <p>:</p>
                            <p>{statusName}</p>
                        </div>
                        <div className="log-details">
                            <p>TIME TO SPEND</p>
                            <p>:</p>
                            <p>{timeRange}</p>
                        </div>
                    </div>
                    <div className="confirm-btn-container">
                        <button onClick={handleConfirm}>Submit</button>
                        <button onClick={navigateHome}>Cancel</button>
                    </div>
                </div>
                {openOverlay && (
                    <div className="one-click-overlay">
                        <p>Please wait...</p>
                    </div>
                )}
            </>
        )
    };
};

export default Confirmation;
