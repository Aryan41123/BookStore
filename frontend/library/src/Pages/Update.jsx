import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({
        title: '',
        description: '',
        price: ''
    });
    const [error, setError] = useState(null);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/books/${id}`, book);
            navigate('/'); 
        } catch (error) {
            setError(error.response?.data?.message || "Error updating book");
            console.error("Error updating book:", error);
        }
    };

    if (error) return <p>{error}</p>;

    return (
        <div className="form">
            <h1>Update Book</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={book.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={book.price}
                        onChange={handleChange}
                        required
                        step="0.01"
                    />
                </div>
                <button type="submit">Update Book</button>
            </form>
            <button onClick={() => navigate('/')}>Cancel</button>
        </div>
    );
};

export default UpdateBook;
