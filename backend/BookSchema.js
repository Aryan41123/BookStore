import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 45
    },
    description: {
        type: String,
        required: true,
        maxlength: 256
    },
    price: {
        type: Number,
        required: true
    }
});

// Create a model based on the schema
const Book = mongoose.model('Book', bookSchema);

 export default Book;
