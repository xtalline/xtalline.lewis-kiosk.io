import React from "react";
import "../assets/styles/card.css";
import { Link } from 'react-router-dom';

const ActivityCard = ({ activity, id, roomName, roomNumber, departmentName }) => {
    return (
        <Link
            className="link"
            to=
            {
                {
                    pathname: "/" + departmentName + "/" + id + "/" + roomNumber + "/" + roomName + "/" + activity.activityName + "/status"
                }
            }
        >
            <div className="card">
                <h3>{activity.activityName}</h3>
            </div>
        </Link>
    )
}

export default ActivityCard;