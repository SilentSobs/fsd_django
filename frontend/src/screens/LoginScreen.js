import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { login } from "../actions/userActions";  

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Access userLogin state from Redux
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo, error } = userLogin;

    useEffect(() => {
        // Redirect user if already logged in
        if (userInfo) {
            navigate("/");
        }
    }, [userInfo, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(username, password));  
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>} 
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    id="username"
                    name="username"
                    required
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    required
                />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
