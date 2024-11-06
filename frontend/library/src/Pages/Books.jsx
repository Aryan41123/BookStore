import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get('http://localhost:5000/books');
                setBooks(res.data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchAllBooks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/books/${id}`);
            
            setBooks(books.filter(book => book._id !== id)); // Update state to remove the deleted book
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    return (
        <div className="container">
            <h1>Alpha Book Shop</h1>
            <div className="books">
                {books.length > 0 ? (
                    books.map(book => (
                        <div className="book" key={book._id}>
                            <h2>{book.title}</h2>
                            <p className='al'>{book.description}</p>
                            <span className="price">${book.price.toFixed(2)}</span>
                            <div className="book-actions">
                                <button className='delete' onClick={() => handleDelete(book._id)}>Delete</button>
                                <Link className='update' to={`/update/${book._id}`}>Update</Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No books available</p>
                )}
            </div>
            <button className="add-button">
                <Link className='link' to='/add'>Add New Book</Link>
            </button>
        </div>
    );
};

export default Books;
