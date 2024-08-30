import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logout from './Logout';

function CompanyProfile() {
    const [profileData, setProfileData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // useEffect(() => {
    //     // Fetch profile data on component mount
    //     const fetchProfileData = async () => {
    //         try {
    //             axios.get('http://127.0.0.1:8000/profile', {
    //                 // headers: {
    //                 //     'Authorization': localStorage.getItem('token'), // Adjust according to your auth mechanism
    //                 // },
    //             }).then((response)=>{
    //                 console.log(response)
    //                 setProfileData(response.data);
    //             })
    //         }    
    //             catch (error) {
    //                 console.log(error)
    //             setErrorMessage('Failed to fetch profile data.');
    //         }
    //     };

    //     fetchProfileData();
    // }, []);
    useEffect(()=>{
        axios('http://127.0.0.1:8000/profile/',{
            headers: {
                'Authorization': localStorage.getItem('token'), // Adjust according to your auth mechanism
            },
        })
        .then((res)=>{
            console.log(res)
          setProfileData(res.data)
        }).catch((e)=>{
          console.log(e)
        })
      },[])

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {profileData ? (
                <div>
                    <p><strong>Name:</strong> {profileData.name}</p>
                    <p><strong>Email:</strong> {profileData.email}</p>
                    <p><strong>Contact:</strong> {profileData.contact}</p>
                    <img src={'http://127.0.0.1:8000/'+profileData.image} alt="Profile" style={{ maxWidth: '200px' }} />
                </div>
            ) : (
                <p>Loading...</p>
            )}
            
        </div>
    );
}

export default CompanyProfile;