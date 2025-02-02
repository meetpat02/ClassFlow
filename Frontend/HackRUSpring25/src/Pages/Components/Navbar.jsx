import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import './navbar.css';

export function Navbar({ user }) {
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
    <div className="styles">
      <div className="nav-left">
        <Link to="/home">
          <button className="navbutton">Home</button>
        </Link>
      </div>

      <div className="nav-right">
        <div className="dropdown-container">
          <p className="navbutton">Search ▼</p>
          <ul className="dropdown">
            <Link to="/searchcourse">
              <li>Search Course</li>
            </Link>
            <Link to="/searchprogram">
              <li>Search Programs of Study</li>
            </Link>
          </ul>
        </div>

        <div className="dropdown-container">
          <p className="navbutton">Programs of Study ▼</p>
          <ul className="dropdown">
            <Link to="/searchpage">
            {userData ? (
              <>
              <li>{userData.school}</li>
              </>
              ) : (
                <li>Loading...</li>
              )}
            </Link>
            <Link to="/searchpage">
            {userData ? (
              <>
              <li>{userData.major}</li>
              </>
              ) : (
                <li>Loading...</li>
              )}
            </Link>
          </ul>
        </div>

        <Link to="/mycourses">
          <button className="navbutton">My Courses</button>
        </Link>
        <Link to="/plannedcourses">
          <button className="navbutton">Planned Courses</button>
        </Link>
        <Link to="/csp">
          <button className="navbutton">Create Schedule</button>
        </Link>

        {!user ? (
          <Link to="/login">
            <button className="navbutton">Login</button>
          </Link>
        ) : (
            <span className="userWelcome"> {user.username}</span>
        )}
      </div>
    </div>
    
  );
}

Navbar.propTypes = {
  user: PropTypes.shape({
      username: PropTypes.string.isRequired, // Validate that 'username' is a string and required
  }).isRequired
};

Navbar.defaultProps = {
  user: null, // Set default to null if no user is passed
};