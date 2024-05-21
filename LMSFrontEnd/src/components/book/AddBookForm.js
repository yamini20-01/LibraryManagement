import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../AddBookForm.css';


const AddBookForm = () => {

  const [successMessageVisible, setSuccessMessageVisible] = useState(false);

  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/books', book)
      .then(response => {
        console.log('Book added successfully:', response.data);
       setSuccessMessageVisible(true);
      })
      .catch(error => {
        console.error('Error adding book:', error);
        // Handle error, display error message, etc.
      });
  };

  return (
    <div className="add-book-container">
      <h2 style={{ textAlign: 'center', color: 'cyan' ,backgroundColor: 'white'}}>Add Book</h2>

      <form className="add-book-form" onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={book.title} onChange={handleChange} />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" name="author" value={book.author} onChange={handleChange} />
        </div>
        <div>
          <label>Genre:</label>
          <input type="text" name="genre" value={book.genre} onChange={handleChange} />
        </div>
        <button type="submit">Add Book</button>
        {successMessageVisible && <p>Book added successfully!</p>}
        <Link to="/dashboard">
          <button>Back</button>
        </Link>
      </form>
    </div>
  );
};

export default AddBookForm;
