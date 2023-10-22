import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./assets/styles/app.css"
import Home from "./pages/Home";
import Log from "./pages/Log";
import Whereabouts from "./pages/Whereabouts";
import Login from "./pages/Login";


const Kiosk = () => {

    const [token, setToken] = useState(false)
    useEffect(() => {
        const storedToken = sessionStorage.getItem('token')
        if (storedToken) setToken(JSON.parse(storedToken))
    }, [])

    useEffect(() => {
        if (token) sessionStorage.setItem('token', JSON.stringify(token))
    }, [token])

    return (
        <>
            {token ? (
                <div className="kiosk-wrapper">
                    <div className="kiosk-container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/*" element={<Log />} />
                            <Route path="/kiosk-whereabouts" element={<Whereabouts />} />
                        </Routes>
                    </div>
                </div>
            ) : (
                <Login setToken={setToken} />
            )}
        </>

    )

}

export default Kiosk;