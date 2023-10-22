import React, { useState, useEffect } from "react";
import "../assets/styles/header.css";
import LegendItem from "./LegendItem";

import supabase from "../config/supabaseClient";


const Legend = () => {
    const [fetchError, setFetchError] = useState(null);
    const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
        const { data, error } = await supabase.from("status").select();

        if (error) {
            setFetchError("Could not fetch the data!");
            setStatus(null);
        } else if (data) {
            setStatus(data);
            setFetchError(null);
        }
        };
        fetchStatus();
    }, []);

    return(
        <div className="kiosk-legend">
            {fetchError && <p>{fetchError}</p>}
            {status && (
            <>
                {status.map((status) => (
                <LegendItem key={status.statusID} status={status} />
                ))}
            </>
            )}
        </div>
    )
}
export default Legend;