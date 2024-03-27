import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiUrl } from './apiConfig';

function LoginPage() {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log(`${apiUrl}/users/login`)
        try {
            const response = await fetch(`${apiUrl}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token); 
                navigate('/home');
            } else {
                alert('Login Error: ' + (data.message || 'Unknown Error'));
            }
        } catch (error) {
            console.error('Request error:', error);
            alert('Request error');
        }
    };

    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>email:</label>
                    <input type="text" value={email} onChange={(e) => setemail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
