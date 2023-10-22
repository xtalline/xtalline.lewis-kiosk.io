import React, { useState, useEffect } from "react";
import InstructorCard from "../components/InstructorCard";
import supabase from "../config/supabaseClient";
import { useParams, useNavigate } from 'react-router-dom';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { HiHome } from "react-icons/hi";

import "../assets/styles/log.css";
import "../assets/styles/app.css";

const Instructors = () => {
  const [fetchError, setFetchError] = useState(null)
  const [user, setUser] = useState(null)
  const { departmentName } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .or('usertype.eq.instructor, usertype.eq.chairperson')
        .eq('departmentname', departmentName)
        .not('accountStatus', 'is', null);

      if (error) {
        setFetchError('Could not fetch the data!')
        setUser(null)
      }
      else if (data) {
        setUser(data)
        setFetchError(null)
      }
    }
    fetchUsers()
  }, [departmentName])

  const navigateHome = () => {
    navigate('/')
  }
  const navigateDepartment = () => {
    navigate('/kiosk-log/departments')
  }
  return (
    <>
      <div className="log-header-wrapper">
        <div className="log-header-links">
          <HiHome className="home" size={25} onClick={navigateHome} />
          <IoChevronForwardOutline size={20} />
          <h3 onClick={navigateDepartment}>Departments</h3>
          <IoChevronForwardOutline size={20} />
          <h3>Instructors</h3>
        </div>
      </div>

      <div className="title-wrapper">
        <h1>YOUR IDENTITY</h1>
      </div>
      <div className="card-container">
        <div className="card-grid">
          {fetchError && (<p>{fetchError}</p>)}
          {user && (
            <>
              {user.map(profiles => (
                <InstructorCard key={profiles.id} profiles={profiles} departmentName={departmentName} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Instructors;