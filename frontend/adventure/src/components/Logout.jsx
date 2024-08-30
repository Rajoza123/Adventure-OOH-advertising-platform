import React, { useEffect } from 'react';
import axios from 'axios';

function Logout() {
    useEffect(() => {
        const handleLogout = async () => {
            try {
                await axios.post('http://localhost:8000/signout/', {}, {
                    headers: {
                        'Authorization': localStorage.getItem('token'), // Adjust according to your auth mechanism
                    },
                });

                // Clear local storage or session data
                localStorage.removeItem('token');
                localStorage.removeItem('company_id');
                localStorage.removeItem('company_name');
                localStorage.removeItem('is_authenticated');

                // Redirect to sign-in page
                window.location.href = '/';
            } catch (error) {
                console.error('Failed to log out.');
            }
        };

        handleLogout();
    }, []);

    return (
        <div className="logout-container">
            <h2>Logging Out...</h2>
        </div>
    );
}

export default Logout;