import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "../assets/styles/time-range.css";

const TimeRangePicker = ({ statusName, activityName, id, roomName, roomNumber, departmentName }) => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);

    const handleIncreaseHour = () => {
        setHours((prevHours) => prevHours + 1);
    };

    const handleDecreaseHour = () => {
        setHours((prevHours) => (prevHours > 0 ? prevHours - 1 : 0));
    };

    const handleIncreaseMinute = () => {
        if (minutes === 59) {
            setMinutes(0);
            setHours((prevHours) => prevHours + 1);
        } else {
            setMinutes((prevMinutes) => prevMinutes + 1);
        }
    };

    const handleDecreaseMinute = () => {
        if (minutes === 0) {
            if (hours > 0) {
                setMinutes(59);
                setHours((prevHours) => prevHours - 1);
            } else {
                setMinutes(0);
            }
        } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
        }
    };

    const formatTime = (value) => {
        return value.toString().padStart(2, '0');
    };

    const timeRange = `${formatTime(hours)}h ${formatTime(minutes)}m`;

    return (
        <div className="time-wrapper">
            <div className="field-outer-wrapper">
                <div className="field-inner-wrapper">
                    <div className="time-input-wrapper">
                        <button onClick={handleDecreaseHour}>-</button>
                        <input
                            name="hours"
                            type="text"
                            value={formatTime(hours)}
                            readOnly
                        />
                        <button onClick={handleIncreaseHour}>+</button>
                    </div>
                    <label htmlFor="hours">Hour/s</label>
                </div>
                <div className="field-inner-wrapper">
                    <div className="time-input-wrapper">
                        <button onClick={handleDecreaseMinute}>-</button>
                        <input
                            name="minutes"
                            type="text"
                            value={formatTime(minutes)}
                            readOnly
                        />
                        <button onClick={handleIncreaseMinute}>+</button>
                    </div>
                    <label htmlFor="minutes">Minute/s</label>
                </div>
            </div>
            <div className="time-range-confirm">
                <p>Duration<span>{timeRange}</span></p>
                <Link
                    className="link"
                    to=
                    {
                        {
                            pathname: "/" + departmentName + "/" + id + "/" + roomNumber + "/" + roomName + "/" + activityName + "/" + statusName + "/" + timeRange + "/confirm",
                        }
                    }
                >
                    <button>CONFIRM</button>
                </Link>
            </div>
        </div>
    )
}
export default TimeRangePicker;