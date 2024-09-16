import React, { useEffect } from 'react';
import axios from 'axios';

function Logout() {
    useEffect(() => {
        const handleLogout = async () => {
        let url = ''
            try {

                if(window.localStorage.getItem("publisher_id"))
{                    url = 'pub_signout'
                    // Clear local storage or session data
                    localStorage.removeItem('token');
                    localStorage.removeItem('publisher_id');
                    localStorage.removeItem('publisher_name');
                    localStorage.removeItem('is_authenticated');
}                else if(window.localStorage.getItem("company_id"))
                {
                    url = 'comp_signout'
                    // Clear local storage or session data
                    localStorage.removeItem('token');
                    localStorage.removeItem('company_id');
                    localStorage.removeItem('company_name');
                    localStorage.removeItem('is_authenticated');
                }
                await axios.post(`http://localhost:8000/${url}/`, {}, {
                    headers: {
                        'Authorization': localStorage.getItem('token'), // Adjust according to your auth mechanism
                    },
                });



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