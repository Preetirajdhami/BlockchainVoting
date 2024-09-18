import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/connectdb.js';
import passport from 'passport';
import userRoutes from './routes/userRoutes.js';
import './config/passport-jwt-strategy.js';

import express from 'express';
const app = express();
const port = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL;

// CORS policy setup
const corsOptions = {
  origin: process.env.FRONTEND_HOST, // Fix here to use environment variable correctly
  credentials: true, // Allow cookies and other credentials
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Connect to the database
connectDB(DATABASE_URL);

// Passport middleware
app.use(passport.initialize());

// Express JSON parser
app.use(express.json());

// Cookie parser middleware
app.use(cookieParser());

// Load Routes
app.use("/api/user", userRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
