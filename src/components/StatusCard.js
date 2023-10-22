import React from "react";
import "../assets/styles/card.css";
import { Link } from 'react-router-dom';

const StatusCard = ({ status, activityName, id, roomName, roomNumber, departmentName }) => {
    return(
        <Link
            className="link"
            to=
            {
                {
                    pathname: "/" + departmentName + "/" + id + "/" + roomNumber + "/" + roomName + "/" + activityName + "/" + status.statusName + "/time",
                }
            }
        >
            <div className="card">
                <h3>{status.statusName}</h3>
            </div>
        </Link>
    )   
}
export default StatusCard;