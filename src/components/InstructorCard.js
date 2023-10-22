import React from "react";
import { Link } from 'react-router-dom'
import "../assets/styles/card.css";

const InstructorCard = ({ profiles, departmentName }) => {
    return (
        <Link className="link"
            to=
            {
                {
                    pathname: "/" + departmentName + "/user/" + profiles.id + "/rooms",
                }
            }
        >
            <div className="card">
                <h3>{profiles.firstname + " " + profiles.lastname}</h3>
                <p>{profiles.departmentName}</p>
            </div>
        </Link>
    )
}

export default InstructorCard;