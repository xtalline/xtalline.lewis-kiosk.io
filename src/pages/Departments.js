
import React, { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import DepartmentCard from "../components/DepartmentCard";
import { useNavigate } from "react-router-dom";
import { IoChevronForwardOutline } from 'react-icons/io5';
import { HiHome } from "react-icons/hi";

import "../assets/styles/log.css";
import "../assets/styles/app.css";

const Departments = () => {
  const [fetchError, setFetchError] = useState(null)
  const [department, setDepartment] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDepartment = async () => {
      const { data, error } = await supabase
        .from('department')
        .select()

      if (error) {
        setFetchError('Could not fetch the data!')
        setDepartment(null)
      }
      else if (data) {
        setDepartment(data)
        setFetchError(null)
      }
    }
    fetchDepartment()
  }, [])

  const navigateHome = () => {
    navigate('/')
  }

  return (
    <>
        <div className="log-header-wrapper">
          <div className="log-header-links">
            <HiHome className="home" size={25} onClick={navigateHome} />
            <IoChevronForwardOutline size={20} />
            <h3>Departments</h3>
          </div>
        </div>
      
      <div className="title-wrapper">
        <h1>DEPARTMENTS</h1>
      </div>
      <div className="card-container">
        <div className="card-grid">
          {fetchError && (<p>{fetchError}</p>)}
          {department && (
            <>
              {department.map(department => (
                <DepartmentCard key={department.departmentID} department={department} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Departments;