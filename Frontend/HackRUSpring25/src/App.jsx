import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import  { useState } from 'react';
import { Home } from './Pages/Home';
import { CSP } from './Pages/CSP';

import { MyCourses } from './Pages/MyCourses';
//import { plannedCourses } from './Pages/plannedCourses';
import { Searchcourse } from './Pages/Searchcourse';
import { Searchprogram } from './Pages/Searchprogram';
import { Programs } from './Pages/Programs';
import { Login } from './Pages/Login';
import { Navbar } from './Pages/Components/Navbar';
//import { UserProvider } from "./Pages/Components/UserContext";




function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser({ username });
  };

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        
          <Route path="/home" element={<Home user={user}/>} />
          <Route path="/csp" element={<CSP />} />
          <Route path="/mycourses" element={<MyCourses user={user}/>} />
          <Route path="/plannedcourses" element={<plannedCourses />} />
          <Route path="/searchcourse" element={<Searchcourse />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/searchprogram" element={<Searchprogram />} />
      </Routes>
    </Router>
  );
}

export default App;