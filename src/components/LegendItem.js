import React from "react";
import "../assets/styles/header.css";

const LegendItem = ({ status }) => {
    return(
        <div className="kiosk-legend-item">
            <div className="circle" style={{backgroundColor: status.statusColor}}/>
            <h4>{status.statusName}</h4>
        </div>
    )
}
export default LegendItem;