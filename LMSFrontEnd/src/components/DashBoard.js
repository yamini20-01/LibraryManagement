import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookDetails from './book/BookDetails';
import './DashBoard.css';
const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookCount, setBookCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [showBooks, setShowBooks] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [authorQuery, setAuthorQuery] = useState('');
  const [bookNameQuery, setBookNameQuery] = useState('');
  const [genreQuery, setGenreQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetchBooks();
    fetchUsers();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/books');
      setBooks(response.data);
      setBookCount(response.data.length); 
      setLoadingBooks(false);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users');
      setUsers(response.data);
      setUserCount(response.data.length);
      setLoadingUsers(false);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const toggleBooks = () => {
    setShowBooks(!showBooks);
    // Hide user details when toggling books
    setShowUsers(false);
  };

  const toggleUsers = () => {
    setShowUsers(!showUsers);
    // Hide book details when toggling users
    setShowBooks(false);
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/books/${id}`);
      // After successful deletion, fetch the updated list of books
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      // After successful deletion, fetch the updated list of users
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSearchByName = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/books/name/${bookNameQuery}`);
      setSelectedBook(response.data);
    } catch (error) {
      console.error('Error fetching book by name:', error);
    }
  };
  const handleSearchByGenre = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/books/genre/${genreQuery}`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books by genre:', error);
    }
  };

  const handleSearchByAuthor = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/books/author/${authorQuery}`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books by author:', error);
    }
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setBookNameQuery(inputValue);
    if (inputValue === '') {
      setSelectedBook(null); 
    }
  };


  const handleGenreInputChange = (event) => {
    const inputValue = event.target.value;
    setGenreQuery(inputValue);
    if (inputValue === '') {
      fetchBooks(); // Reset the list when the genre input is empty
    }
  };

  const handleAuthorInputChange = (event) => {
    const inputValue = event.target.value;
    setAuthorQuery(inputValue);
    if (inputValue === '') {
      fetchBooks(); // Reset the list when the author input is empty
    }
  };
  

  return (

    <div>
  
    <h2 style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px',color:'darkgrey',fontSize:'40px',backgroundColor:'white' }}>Dashboard</h2>

    <div className="search-form-container">

      <div className="search-form">
        <input
          type="text"
          placeholder="Search by Book Name"
          value={bookNameQuery}
          onChange={handleInputChange}
        />
        <button onClick={handleSearchByName}>Search</button>
      </div>

      <div className="search-form">
          <input
            type="text"
            placeholder="Search by Genre"
            value={genreQuery}
            onChange={handleGenreInputChange}
          />
          <button onClick={handleSearchByGenre}>Search by Genre</button>

        </div>

        <div className="search-form">
          <input
            type="text"
            placeholder="Search by Author"
            value={authorQuery}
            onChange={handleAuthorInputChange}
          />
          <button onClick={handleSearchByAuthor}>Search by Author</button>

        </div>

</div>

<div className="dashboard-container">
<div style={{ textAlign: 'center', marginBottom: '20px' }}>


<div className="blocks-container">
        {/* Block with book count and image */}
        <div className="block">
          <img src="data:image/jpeg;base64,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" alt="Book Image" />
          <p>Total Books: {bookCount}</p>
        </div>
        <div className="block"> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkL_zpTULJ9oHSTLYX2iaSAeeCxoPUi3hWKQ&s" alt="User" />
              <p>Total Users: {userCount}</p></div>
      </div>


      </div>
      <BookDetails book={selectedBook} show={selectedBook !== null} />
      
      <div className="dashboard-content">
      <div className="sidenav" style={{ textAlign: 'center' }}>
      <h2 style={{ marginBottom: '40px',marginTop:'10px',color:'#fff' }}>Library System</h2>
      <button style={{ width: '150px', height: '40px', marginBottom: '10px' }} onClick={toggleBooks}>{showBooks ? 'Hide Books' : 'Show All Books'}</button>
      <br /><br></br>
      <button style={{ width: '150px', height: '40px', marginBottom: '10px' }} onClick={toggleUsers}>{showUsers ? 'Hide Users' : 'Show All Users'}</button>
      <br />
      <Link to="/add-book" style={{ marginRight: '2px', textDecoration: 'none' }}>
      <button style={{ width: '150px', height: '40px' }}>Add Book</button>
      </Link>
      <Link to="/" style={{ textDecoration: 'none' }}>
    <button style={{ width: '150px', height: '40px' }}>Logout</button>
  </Link>
</div>


        {showBooks && (
          <div className="book-table">
            <h3>Books</h3>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map(book => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>
                      <Link to={`/edit-book/${book.id}`}>
                        <button>Edit</button>
                      </Link>
                      <button onClick={() => deleteBook(book.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showUsers && (
          <div className="user-table">
            <h3>Users</h3>
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Dashboard;           