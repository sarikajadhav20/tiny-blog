import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        if (conn) {
            console.log('🍃  MongoDB connected successfully');
        }
    } catch (error) {
        console.error('❌  MongoDB connection failed:', error);
    }
}

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the Tiny Blog API!',
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`✈️  Server is running on http://localhost:${PORT}`);
    connectDB();
});