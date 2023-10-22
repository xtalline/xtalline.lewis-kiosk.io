import React, { useState, useEffect } from "react";
import ActivityCard from "../components/ActivityCard";
import { useParams, useNavigate } from 'react-router-dom';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { HiHome } from "react-icons/hi";
import supabase from "../config/supabaseClient";

import "../assets/styles/log.css";
import "../assets/styles/app.css";

const Activities = () => {
  const [fetchError, setFetchError] = useState(null)
  const [activity, setActivity] = useState(null)
  const navigate = useNavigate()
  const { roomNumber, roomName, id, departmentName } = useParams()

  useEffect(() => {
    const fetchActivity = async () => {
      const { data, error } = await supabase
        .from('activity')
        .select()
        .order('activityID', { ascending: true })

      if (error) {
        setFetchError('Could not fetch the data!')
        setActivity(null)
      }
      else if (data) {
        setActivity(data)
        setFetchError(null)
      }
    }
    fetchActivity()
  }, [])

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
            <h3>Activities</h3>
          </div>
        </div>
      
      <div className="title-wrapper">
        <h1>ACTIVITIES</h1>
      </div>
      <div className="card-container">
        <div className="card-grid">
          {fetchError && (<p>{fetchError}</p>)}
          {activity &&
            (
              <>
                {
                  activity.map(activity => (
                    <ActivityCard
                      key={activity.activityID}
                      activity={activity}
                      id={id}
                      roomName={roomName}
                      roomNumber={roomNumber}
                      departmentName={departmentName}
                    />
                  ))
                }
              </>
            )
          }
        </div>
      </div>
    </>
  )
}

export default Activities;