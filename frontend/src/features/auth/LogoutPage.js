import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');

        navigate('/');
    }, [navigate]);

    return (
        <div>
            <p>Logging out...</p>
            {}
        </div>
    );
}

export default LogoutPage;
