import mongoose from 'mongoose'
// const debug = require('debug')('development:mongoose');
import dotenv from 'dotenv';
dotenv.config();

// Use a specific database name in the URI
const mongoURI = process.env.MONGO_URI; // files store in database according this
const connectToMongo = async () => {
    console.log('Attempting to connect to MongoDB...');
    try {
        // Remove deprecated options
        await mongoose.connect(mongoURI);
        console.log(); ('Connection successful');
    } catch (error) {
        console.log(); ('Connection failed:', error);
    }

}
export default connectToMongo;
