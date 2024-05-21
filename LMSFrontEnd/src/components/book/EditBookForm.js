import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'; // Import Link and useParams

const EditBookForm = () => {
  const { id } = useParams();
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: ''
  });

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/books/${id}`);
      setBook(response.data);
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/books/${id}`, book);
      // Handle successful update, e.g., show success message
    } catch (error) {
      console.error('Error updating book:', error);
      // Handle error, e.g., show error message
    }
  };

  return (
    <div>
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Update Book</button>
      </form>
      {/* Back button to navigate to Dashboard */}
      <Link to="/dashboard">
        <button>Back</button>
      </Link>
    </div>
  );
};

export default EditBookForm;
