import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers } from 'react-icons/fa';
import { HiHome } from 'react-icons/hi';
import { BsFillDoorOpenFill } from 'react-icons/bs';

import "../assets/styles/header.css";

const Header = () => {
    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate('/');
    };
    const navigateToLog = () => {
        navigate('/kiosk-log/departments');
    };
    const navigateToWhereabouts = () => {
        navigate('/kiosk-whereabouts');
    };

    return (
        <div className="kiosk-header-menu">
            <div className="header-menu-item"
                onClick={navigateToHome}
                onTouchStart={navigateToHome}>
                <HiHome className="header-menu-item-ic" />
                <h4>Home</h4>
            </div>
            <div className="header-menu-item"
                onClick={navigateToLog}
                onTouchStart={navigateToLog}>
                <BsFillDoorOpenFill className="header-menu-item-ic" />
                <h4>Log</h4>
            </div>
            <div className="header-menu-item"
                onClick={navigateToWhereabouts}
                onTouchStart={navigateToWhereabouts}>
                <FaUsers className="header-menu-item-ic" />
                <h4>Whereabouts</h4>
            </div>
        </div>

    )
}
export default Header;