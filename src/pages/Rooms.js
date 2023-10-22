import React, { useState, useEffect } from "react";

import supabase from "../config/supabaseClient";
import { useParams, useNavigate } from 'react-router-dom';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { HiHome } from "react-icons/hi";
import RoomCard from "../components/RoomCard";

import "../assets/styles/log.css";
import "../assets/styles/app.css"

const Rooms = () => {
  const [fetchError, setFetchError] = useState(null)
  const [room, setRoom] = useState(null)
  const navigate = useNavigate();
  const { id } = useParams();
  const { departmentName } = useParams();

  useEffect(() => {
    const fetchRooms = async () => {
      const { data, error } = await supabase
        .from('rooms')
        .select()
        .order('roomNumber', { ascending: true })

      if (error) {
        setFetchError('Could not fetch the data!')
        setRoom(null)
      }
      else if (data) {
        setRoom(data)
        setFetchError(null)
      }
    }
    fetchRooms()
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
            <h3>Rooms</h3>
          </div>
        </div>

      <div className="title-wrapper">
        <h1>LOCATION</h1>
      </div>

      <div className="card-container">
        <div className="card-grid">
          {fetchError && (<p>{fetchError}</p>)}
          {room && (
            <>
              {room.map(room => (
                <RoomCard key={room.roomID} room={room} id={id} departmentName={departmentName} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Rooms;