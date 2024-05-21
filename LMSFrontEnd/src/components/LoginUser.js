import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dashboard from './DashBoard';

const LoginUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        username: username,
        password: password
      });
      setMessage(response.data);
      setLoggedIn(true);
    } catch (error) {
      setMessage(error.response.data);
    }
  };

  // Conditional rendering based on login status
  if (!loggedIn) {
    return (
      
      <div style={styles.background}>
       <h2 style={styles.heading1}>Library Management</h2>
       <br></br><br></br>
       <div style={styles.container}>
        <h2 style={styles.heading}>User Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <br />
        <button onClick={handleLogin} style={styles.button}>Login</button>
        <p style={styles.message}>{message}</p>
        <p style={styles.registerLink}>If you don't have an account, <Link to="/register" style={styles.link}>register here</Link>.</p>
      </div>
      </div>
    );
  } else {
    return <Dashboard />; // Render Dashboard component after successful login
  }
};

export default LoginUser;

const styles = {
  background: {
    backgroundImage: 'url("https://png.pngtree.com/background/20230517/original/pngtree-brown-bookshelf-with-books-on-it-picture-image_2639169.jpg")',
    backgroundSize: 'cover',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading1: {
    marginBottom: '20px',
    color: 'yellow',
    fontSize: '40px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // 
    fontWeight: 'bold', 
    letterSpacing: '1px', 
    position: 'fixed', top: '0', left: '50%', transform: 'translateX(-50%)', zIndex: '9999'
  },
  container: {
    textAlign: 'center',
    margin: '50px auto',
    maxWidth: '400px',
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  heading: {
    marginBottom: '20px',
    color: '#333',
    fontSize: '24px',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    width: '90%',
    border: '1px solid #ccc',
    borderRadius: '3px',
  },
  button: {
    padding: '12px 20px',
    fontSize: '18px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    marginBottom: '10px',
    transition: 'background-color 0.3s ease',
  },
  message: {
    margin: '10px 0',
    fontSize: '14px',
    color: 'red',
  },
  registerLink: {
    fontSize: '14px',
    color: '#333',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
};

