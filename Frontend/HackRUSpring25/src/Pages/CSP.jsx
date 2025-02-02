import { Calendar } from './Components/Calendar';
import { useState, useEffect } from 'react';
import './CSP.css';

export function CSP() {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible1, setIsVisible1] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [schedule, setSchedule] = useState([]); // Stores the selected sections
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories (departments)
  useEffect(() => {
    fetch('http://localhost:8080/api/courses/departments')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setError('Failed to fetch categories');
        setLoading(false);
      });
  }, []);

  // Fetch courses based on selected category (department)
  useEffect(() => {
    if (selectedCategory) {
      fetch(`http://localhost:8080/api/courses/${selectedCategory}`)
        .then((response) => response.json())
        .then((data) => {
          setCourses(data);
        })
        .catch((error) => {
          console.error('Error fetching courses:', error);
        });
    } else {
      setCourses([]);
    }
  }, [selectedCategory]);

  // Fetch sections when a course is selected
  useEffect(() => {
    if (selectedCourse) {
      fetch(`http://localhost:8080/api/courses/${selectedCourse}/sections`)
        .then((response) => response.json())
        .then((data) => setSections(data))
        .catch((error) => {
          console.error('Error fetching sections:', error);
        });
    } else {
      setSections([]);
    }
  }, [selectedCourse]);

  const handleAddToSchedule = (section) => {
    if (section.capacity - section.studentsSignedUp > 0) {
      setSchedule([...schedule, section]);
      alert(`Added to schedule: ${section.course.courseName} - Section ${section.courseSection}`);
    } else {
      alert('This section is full');
    }
  };

  const handleCreateSchedule = () => {
    const scheduleData = schedule.map((section) => ({
      courseName: section.course.courseName,
      courseId: section.course.courseId,
      section: section.courseSection,
      timing: `${section.classDay} ${section.classStartTime} - ${section.classEndTime}`,
    }));

    fetch('http://localhost:8080/api/schedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scheduleData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Schedule created successfully');
        setIsVisible(true); // Show the calendar
      })
      .catch((error) => {
        console.error('Error creating schedule:', error);
        alert('Failed to create schedule');
      });
  };

  // Loading or error state rendering
  if (loading) {
    return <div>Loading departments...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="outer">
        <div>
          <div className="main-container">
            <div className="main1">
              <h2 className="headingText">
                <u>Select Courses</u>
              </h2>
              {/* First Dropdown: Department */}
              <div className="dropdown-menu-container">
                <label className="dropdown-label">Select a Department:</label>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="">-- Select --</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.split(' - ')[0]}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Second Dropdown: Courses */}
              {selectedCategory && (
                <div className="dropdown-menu-container">
                  <label className="dropdown-label">Select a Course:</label>
                  <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                    <option value="">-- Select --</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.courseId}>
                        {course.courseId} - {course.courseName}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Selected Courses List */}
              {schedule.length > 0 && (
                <div>
                  <h3>Selected Courses:</h3>
                  <ul>
                    {schedule.map((section, index) => (
                      <li key={index}>
                        {section.course.courseName} - Section {section.courseSection}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Buttons */}
              <div>
                <button onClick={() => setIsVisible1(!isVisible1)}>Continue</button>
                
              </div>
            </div>

            {isVisible1 && 
              <div><p>Schedule Created</p></div>
            }
          </div>
          <button onClick={() => setIsVisible(!isVisible1)}>Build</button>
        </div>

        <div className="calendarcss">
          {isVisible && <div><Calendar /></div>}
        </div>
      </div>
    </>
  );
}
