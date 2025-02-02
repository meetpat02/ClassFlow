import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export function MyCourses({ user }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!user || !user.username) return; // Do nothing if username is not available

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${user.username}/courses`, {
          method: 'POST', // Change to POST
          headers: {
            'Content-Type': 'application/json', // Make sure to set the content type to JSON
          },
        });
        
        if (response.ok) {
          const data1 = await response.json();
          setData(data1); // Assuming the API returns an array of course names
        } else {
          console.error('Error: ', response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <div>
      <h2>My Courses</h2>
      <table>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((course, index) => {
              // Split the course string into course code and name
              const [courseCode, ...courseNameParts] = course.split(' - ');
              const courseName = courseNameParts.join(' - '); // Join back if the course name contains a dash

              return (
                <tr key={index}>
                  <td>{courseCode}</td>
                  <td>{courseName}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="2">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

MyCourses.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired, // Validate that 'username' is a string and required
  }).isRequired,
};

MyCourses.defaultProps = {
  user: null, // Set default to null if no user is passed
};
