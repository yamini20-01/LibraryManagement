import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegisterLoginPage from './components/RegisterLoginPage';
import { NavigationProvider } from './components/NavigationContext';
import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';
import AddBookForm from './components/book/AddBookForm';
import DashBoard from './components/DashBoard';
import EditBookForm from './components/book/EditBookForm';

const App = () => {
  return (
    <NavigationProvider>
      <Router>
        <Routes>
       
          <Route path="/" element={<RegisterLoginPage />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/add-book" element={<AddBookForm />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/edit-book/:id" element={<EditBookForm />} />
          
        </Routes>
      </Router>
    </NavigationProvider>
  );
};

export default App;
