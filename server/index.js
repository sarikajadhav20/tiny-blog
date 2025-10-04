import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { postSignup, postLogin } from './controllers/user.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

let requestCount = 0;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        if (conn) {
            console.log('🍃  MongoDB connected successfully');
        }
    } catch (error) {
        console.error('❌  MongoDB connection failed:', error);
    }
};

app.get('/api/request-count', (req, res) => {
    res.json({ requestCount });
});

//middleware to count requests
app.use((req, res, next) => {
    requestCount++;
    next();
});

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the Tiny Blog API!',
    });
});

app.get('/api/test1', (req, res) => {
    console.log("Actual controller test1 called");
    res.json({
        message: 'Test1 route is working!',
    });
});

app.get('/api/test2', (req, res) => {
    console.log("Actual controller test2 called");
    res.json({
        message: 'Test2 route is working!',
    });
});

app.post('/signup',postSignup);
app.post('/login',postLogin);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`✈️  Server is running on http://localhost:${PORT}`);
    connectDB();
});