import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Home.css';

export function Home({ user }) {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (!user || !user.username) return; // Do nothing if username is not available
    
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/users/${user.username}`);
                const data = await response.json();
                setUserData(data); // Assuming API response contains user details
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
    
        fetchUserData();
    }, [user]);

    return (
        <div className="details">
            <div>
                <h2 className="heading"><u>My Details</u></h2>
            </div>
            <div>
                {userData ? (
                    <>
                        <p><b>{userData.name}</b></p>
                        <p>NetID: {userData.netId}</p>
                        <p>School: {userData.school}</p>
                        <p>Declared Year Of Graduation: {userData.graduationYear}</p>
                        <p>Degree Credits Earned: {userData.creditsCompleted}</p>
                        <p>Current GPA: {userData.gpa}</p>
                    </>
                ) : (
                    <p>Loading user details...</p>
                )}
            </div>
        </div>
    );
}

Home.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired, // Validate that 'username' is a string and required
    }).isRequired
};

Home.defaultProps = {
    user: null, // Set default to null if no user is passed
};
