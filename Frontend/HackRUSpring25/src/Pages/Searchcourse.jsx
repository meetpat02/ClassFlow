import { useState, useEffect } from 'react';
import './Searchcourse.css';

export function Searchcourse() {
    const [items, setItems] = useState([]); // Store all courses
    const [filteredItems, setFilteredItems] = useState([]); // Store filtered courses
    const [courseId, setCourseId] = useState(''); // Search by courseId only

    useEffect(() => {
        fetch(`http://localhost:8080/api/courses`) // Replace with actual API URL
            .then(response => response.json())
            .then(data => {
                setItems(data);
                setFilteredItems(data); // Initially display all courses
            })
            .catch(error => console.error('Error fetching items:', error));
    }, []); // Runs only once on component mount

    // Function to filter courses based on courseId
    const handleSearch = () => {
        const filtered = items.filter(course =>
            course.courseId.toLowerCase().includes(courseId.toLowerCase())
        );
        setFilteredItems(filtered);
    };

    return (
        <div className="main">
            <div className="header">
                <h1>Search Course</h1>
                <div className="search">
                    <div className="eachsearch">
                        <h2>Course ID:</h2>
                        <input
                            type="text"
                            value={courseId}
                            onChange={(e) => setCourseId(e.target.value)}
                        />
                    </div>
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>

            {/* Display searched courses */}
            <div className="courses-list">
                <h2>Available Courses:</h2>
                {filteredItems.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Course ID</th>
                                <th>Course Name</th>
                                <th>Credits</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map((course, index) => (
                                <tr key={index}>
                                    <td>{course.courseId}</td>
                                    <td>{course.courseName}</td>
                                    <td>{course.credits}</td>
                                    <td>{course.courseDescription}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No matching courses found.</p>
                )}
            </div>
        </div>
    );
}