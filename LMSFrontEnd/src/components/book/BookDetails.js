import React from 'react';
import '../DashBoard.css';
const BookDetails = ({ book, show }) => {
  if (!show) {
    return null; 
  }

  return (
    <div className="book-details">
      <h3>Book Details</h3>
      <table className="book-table">
        <tbody>
          <tr>
            <td className="label"><strong>Title:</strong></td>
            <td>{book.title}</td>
          </tr>
          <tr>
            <td className="label"><strong>Author:</strong></td>
            <td>{book.author}</td>
          </tr>
          <tr>
            <td className="label"><strong>Genre:</strong></td>
            <td>{book.genre}</td>
          </tr>
          {/* Add more details as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default BookDetails;
