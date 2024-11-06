import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql';
import cors from 'cors';
import connectToMongo from './MongooseConnect.js';
import Book from './BookSchema.js'

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());
connectToMongo();

app.get('/', (req, res) => {
    res.json("backend running")
})

app.get('/books', async (req, res) => {
    try {
        const books = await Book.find(); // Fetch all books from the database
        res.status(200).json(books); // Send the books as a JSON response
    } catch (error) {
        console.error('Error fetching books:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error' }); // Send an error response
    }
});



app.post("/books", async (req, res) => {
    const { title, description, price } = req.body; // Get data from request body

    // First, check if the book already exists
    const bookCheck = await Book.findOne({ title });
    if (bookCheck) {
        return res.status(400).json({ message: "Book with this title already exists." });
    }
    const newBook = new Book({
        title,
        description,
        price
    });

    await newBook.save();

    return res.status(201).json({ message: "Book added successfully", newBook });
});


// app.post("/books", (req, res) => {
//     const { title, description, price } = req.body; // Get data from request body
//     const q = 'INSERT INTO BOOKSTORE (`title`, `description`,`price `) VALUES (?, ?, ?)';
//     const values = [title, description, price];

//     db.query(q, values, (err, result) => {
//         if (err) return res.status(500).json(err); // Send a 500 error if there's a database error

//         // Construct the response with the added book details
//         const addedBook = {
//             id: result.insertId, // Get the ID of the newly added book
//             title,
//             description,

//         };

//         return res.status(201).json({ message: "Book added successfully", book: addedBook }); // Return a success response with the added book
//     });
// });
app.delete("/books/:id", async (req, res) => {
    const bookId = req.params.id;

    try {
        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book deleted successfully", book: deletedBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


app.put("/books/:id", async (req, res) => {
    const bookId = req.params.id;
    const { title, description, price } = req.body;

    // Validate input fields
    if (!title || !description || price === undefined) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Update the book
        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            { title, description, price },
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        // If book not found
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Respond with the updated book
        res.status(200).json({ message: "Book updated successfully", book: updatedBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


app.listen(5000, () => {
    console.log("Backend running on port 5000");
});
