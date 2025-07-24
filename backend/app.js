import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import connectDB from './config/connectdb.js';
import passport from 'passport';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import multer from 'multer';
import {
  swaggerUi,
  swaggerSpec
} from './swagger.js';

import './config/passport-jwt-strategy.js';

import express from 'express';
const app = express();
const port = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// ✅ Allow multiple origins
const allowedOrigins = (process.env.FRONTEND_HOST || "").split(",");

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));


// Connect to the database
connectDB(DATABASE_URL);

// Cookie parser middleware
app.use(cookieParser());

// Passport middleware
app.use(passport.initialize());

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Use a unique filename
  },
});
const upload = multer({
  storage
});

// File upload route
app.post('/upload', upload.single('photo'), (req, res) => {
  if (req.file) {

    res.json({
      message: 'File uploaded successfully',
      file: req.file,
    });
  } else {
    // If file upload failed
    res.status(400).json({
      message: 'File upload failed'
    });
  }
});

// Static Files - Serve uploads directory
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Express JSON parser
app.use(express.json());

// Load Routes
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);


//  Root route
app.get('/', (req, res) => {
  res.send('✅ Backend is running successfully!');
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});