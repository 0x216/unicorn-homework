import { apiUrl } from './apiConfig';

const checkTokenValidity = async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const response = await fetch(`${apiUrl}/users/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.ok;
    } catch (error) {
        console.error('Error during token validation', error);
        return false;
    }
};

export { checkTokenValidity };