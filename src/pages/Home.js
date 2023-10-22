import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/app.css"
import Header from "../components/Header";
import { FaUsers } from 'react-icons/fa';
import { BsFillDoorOpenFill } from 'react-icons/bs';

const KioskHome = () => {
  const navigate = useNavigate();

  const navigateToLog = () => {
    navigate('/kiosk-log/departments');
  }
  const navigateToWhereabouts = () => {
    navigate('/kiosk-whereabouts');
  };

  /**Formatted Date*/
  function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  const currentDate = new Date();
  const formattedCurrentDate = formatDate(currentDate);

  /**Time updating every seconds without refresh*/
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const currentTime = time.toLocaleTimeString();


  return (
    <>
      <div className="kiosk-header-container">
        <Header />
      </div>
      <div className="kiosk-header-content">
        <div className="kiosk-header-greeting">
          <p>Good day!</p>
          <h1>What would you like to do?</h1>
        </div>
        <div className="kiosk-header-timedate">
          <p>{currentTime}</p>
          <h1>{formattedCurrentDate}</h1>
        </div>
      </div>
      <div className="kiosk-main-menu-container">
        <div className="kiosk-main-menu" onClick={navigateToLog} on='true'>
          <BsFillDoorOpenFill size={120} className="kiosk-main-menu-ic" />
          <p>Log whereabouts</p>
        </div>
        <div className="kiosk-main-menu" onClick={navigateToWhereabouts}>
          <FaUsers size={120} className="kiosk-main-menu-ic" />
          <p>See others' whereabouts</p>
        </div>
      </div>
    </>
  )
}

export default KioskHome;