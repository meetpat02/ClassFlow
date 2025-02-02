import { useNavigate } from 'react-router-dom';
import{ useState } from 'react';
import './Login.css'
import PropTypes from 'prop-types';

export function Login({ onLogin }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username);
    navigate('/home');
  };

  return (
    <div className='loginform'>

      <h1>Welcome, Please Login</h1>

      <div className="login-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your netID"
          className="login-input"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="login-input"
          required
        />
        <button type="submit" onClick={handleSubmit} className="login-button">
          Log In
        </button>
      </div>
    </div>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};