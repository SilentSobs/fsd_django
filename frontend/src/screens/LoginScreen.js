import React, { useState } from "react";
import Cookies from 'js-cookie';  // Import js-cookie


import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();  
    
    const [username, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const loginData = {
            username: username,
            password: password,
        };
    
        
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/users/login/", loginData);
            
            const {access,refresh} = response.data
            Cookies.set('access_token', access, { expires: 7, secure: true, sameSite: 'Strict' });  // Expires in 7 days
            Cookies.set('refresh_token', refresh, { expires: 7, secure: true, sameSite: 'Strict' });
            console.log(response.data);
            
            navigate('/');
        } catch (error) {
            console.error("There was an error logging in:", error);
        }
    
        console.log("Logging in with:", username, password);
    };


    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setEmail(e.target.value)}
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
