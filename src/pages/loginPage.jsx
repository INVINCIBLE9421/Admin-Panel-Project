import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/auth";

const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const loginStatus = window.localStorage.getItem("loginStatus");
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        if (loginStatus === "true") {
        navigate("/dashboard", { replace: true });
        }
    }, [loginStatus, navigate]);

    const handleLogin = () => {
        if (!userName || !password || userName !== password) {
        alert("Please enter a valid Details!");
        return;
        } else if (userName === password) {
        alert("Login Successful");
        navigate("/dashboard", { replace: true });
        login(userName);
        }
    };

    return (
        <div className="login-container">
            <div className="loginform">
                <h2>Welcome to Dashboard, Login</h2>
                <div>
                    <label>Username:</label>
                    <br />
                    <input
                        type="text"
                        name="userName"
                        value={userName}
                        className="account-input"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <br />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        className="account-input"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}

export default Login;