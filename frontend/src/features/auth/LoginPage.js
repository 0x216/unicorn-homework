import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiUrl } from '../../api/apiConfig';

import '../../assets/styles/LoginPage.css'
import '../../assets/styles/AnimatedBackground.css'

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home');
        }
    }, [navigate]);

    const validateForm = () => {
        const newErrors = {};
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            newErrors.email = 'Invalid email address';
        } else {
            newErrors.email = '';
        }
        if (!password.trim()) {
            newErrors.password = 'Password cannot be empty';
        } else {
            newErrors.password = '';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0 || Object.values(newErrors).every(val => val === '');
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        try {
            // console.log(`${apiUrl}/users/login`)
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
                setErrors(prevErrors => ({ ...prevErrors, form: data.message || 'Unknown Error' }));
            }
        } catch (error) {
            console.error('Request error:', error);
            setErrors(prevErrors => ({ ...prevErrors, form: 'Request error' }));
        }
    };

    return (
        <div className="background"> {}
            <div className="cube"></div>
            <div className="cube"></div>
            <div className="cube"></div>
            <div className="cube"></div>
            <div className="cube"></div>
    
            <div className="content-container"> {}
                <div className="login-form">
                    <h2>Log in</h2>
                    <form onSubmit={handleLogin}>
                        <div>
                            <label>Email:</label>
                            {errors.email && <div className="errors" style={{ color: 'red' }}>{errors.email}</div>}
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@example.com"
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            {errors.password && <div className="errors" style={{ color: 'red' }}>{errors.password}</div>}
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="password"
                            />
                            
                        </div>
                        {errors.form && <div style={{ color: 'red' }}>{errors.form}</div>}
                        <div className="button-container">
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
