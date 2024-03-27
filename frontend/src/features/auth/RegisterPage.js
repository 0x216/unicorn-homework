import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiUrl } from '../../api/apiConfig';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '', form: '' });
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
        }
        if (!password.trim()) {
            newErrors.password = 'Password cannot be empty';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        if (!validateForm()) return;

        try {
            const registerResponse = await fetch(`${apiUrl}/users/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const registerData = await registerResponse.json();
            if (registerResponse.ok) {
                const loginResponse = await fetch(`${apiUrl}/users/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
                const loginData = await loginResponse.json();
                if (loginResponse.ok) {
                    localStorage.setItem('token', loginData.token);
                    navigate('/home');
                } else {
                    setErrors(prevErrors => ({ ...prevErrors, form: loginData.message || 'Login after registration failed' }));
                }
            } else {
                setErrors(prevErrors => ({ ...prevErrors, form: registerData.message || 'Registration failed' }));
            }
        } catch (error) {
            console.error('Request error:', error);
            setErrors(prevErrors => ({ ...prevErrors, form: 'Request error' }));
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter your email'
                    />
                    {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter your password'
                    />
                    {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                </div>
                {errors.form && <div style={{ color: 'red' }}>{errors.form}</div>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;
