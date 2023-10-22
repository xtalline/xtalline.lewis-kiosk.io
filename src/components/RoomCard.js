import React from "react";
import { Link } from 'react-router-dom';

import "../assets/styles/card.css";

const RoomCard = ({ room, id, departmentName }) => {
    return (
        room.roomNumber !== 0 ? (
            <Link className="link"
                to={
                    {
                        pathname: "/" + departmentName + "/" + id + "/" + room.roomNumber + "/" + room.roomName + "/activities",
                    }
                }
            >
                <div className="card">
                    <h3 className="room-number">{room.roomNumber}</h3>
                    <p className="room-name">{room.roomName}</p>
                </div>
            </Link>
        ) : (
            <div>
                <Link className="link"
                    to={
                        {
                            pathname: "/" + departmentName + "/" + id + "/" + room.roomNumber + "/" + room.roomName + "/" + "Unknown" + "/" + "Unknown" + "/" + "Unknown" + "/confirm",
                        }
                    }
                >
                    <div className="card">
                        <h3 className="room-number">{room.roomNumber}</h3>
                        <p className="room-name">{room.roomName}</p>
                    </div>
                </Link>
            </div>
        )
    );
}

export default RoomCard;
