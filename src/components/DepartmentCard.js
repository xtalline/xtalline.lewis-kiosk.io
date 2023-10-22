import React from "react";
import { Link } from 'react-router-dom';
import "../assets/styles/card.css";

const DepartmentCard = ({ department }) => {
    return (
        <Link className="link"
            to=
            {
                {
                    pathname: "/" + department.departmentName + "/instructors"
                }
            }
        >
            <div className="card">
                <h3>{department.departmentName}</h3>
            </div>
        </Link>
    );
}

export default DepartmentCard;
