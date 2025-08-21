import mongoose from 'mongoose';

export const connectDB = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected and this is proof ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection error and this is proof ${error}`)
    }
}