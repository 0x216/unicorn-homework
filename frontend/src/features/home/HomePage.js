import React, { useState, useEffect } from 'react';

import { apiUrl } from '../../api/apiConfig';

function HomePage() {
    const [trackingData, setTrackingData] = useState(null);
    const [userData, setUserData] = useState(null);

    console.log(localStorage.getItem('token'))

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        fetch(`${apiUrl}/tracking/`, { headers })
            .then(response => response.json())
            .then(data => setTrackingData(data))
            .catch(error => console.error('Error fetching data:', error));

        fetch (`${apiUrl}/users/me/`, { headers })
            .then(response => response.json())
            .then(data => setUserData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h1>Welcome to the Home Page!</h1>
            {trackingData && userData &&(
                <div>
                    <h2>Tracking Data</h2>
                    <h3>Hey, {userData.name || 'User'}</h3>
                    <pre>{JSON.stringify(trackingData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default HomePage;
