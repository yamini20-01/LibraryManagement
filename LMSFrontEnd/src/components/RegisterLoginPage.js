import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 style={{color:'Highlight',position:'fixed',top:0}}>Library Management</h1>
      <div className="button-container">
        <Link to="/register">
          <button className="dashboard-button">Register</button>
        </Link>
        <Link to="/login">
          <button className="dashboard-button">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
