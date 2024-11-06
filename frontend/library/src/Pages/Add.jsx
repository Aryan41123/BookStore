import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    price: null
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/books', book);
      console.log(res);
      if (res.status === 201) {
        navigate("/");
      }

    } catch (error) {
      console.error("Error adding book:", error);
      if (error.response && error.response.status === 400) {
        // Check if the error message indicates that the book already exists
        alert(error.response.data.message || "An error occurred. Please try again.");
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
 
  };

  return (
    <div className="container">
      <div className="titleAlpha">Alpha Book</div>
      <h1>Add Book</h1>
      <form className="d-flex flex-column align-items-center">
        <input
          className="input-field"
          type="text"
          placeholder='Title'
          onChange={handleChange}
          name='title'
          required
        />
        <textarea
          className="input-field"
          placeholder='Description'
          onChange={handleChange}
          name='description'
          required
        />
        <input
          className="input-field"
          type="number"
          placeholder='Price'
          name='price'
          onChange={handleChange}
          required
        />
        <button className="button" onClick={handleClick}>Add</button>
      </form>
    </div>
  );
};

export default Add;
