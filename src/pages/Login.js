import React, { useState } from "react";

import "../assets/styles/login.css";

import AppLogo from "../assets/img/app-logo.png";
import supabase from "../config/supabaseClient";
import bcrypt from "bcryptjs"

const Login = ({ setToken }) => {
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault()

        if (!email || !password) {
            console.log("123")
            return

        } else {
            const { data, error } = await supabase
                .from('profiles')
                .select()
                .eq('email', email)
                .single()

            if (data.email && data.usertype === "kiosk") {
                if (bcrypt.compareSync(password, data.password)) {
                    const { data, error } = await supabase.auth.signInWithPassword({
                        email: email,
                        password: password,
                    });
                    if (data) {
                        console.log('success')
                        console.log(data)
                        setToken(data);

                    } else if (error) {
                        console.log('error')
                    }
                } else {
                    console.log("password incorrect")
                }
            } else {
                console.log("admin does not exist")
            }


        }
    }
    return (
        <div className="login-wrapper">
            <div className="login-field-container">
                <div className="login-field">
                    <img src={AppLogo} alt="LEWIS Logo" />
                    <form onSubmit={handleLogin}>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </form>
                    <a href="#">Forgot Password?</a>
                    <button className="login-btn" onClick={handleLogin}>LOG IN</button>
                </div>
            </div>
        </div>
    )
}
export default Login;