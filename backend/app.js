// Load ENV
import dotenv from 'dotenv';
dotenv.config();

// Imports
import cors from 'cors';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import multer from 'multer';

import connectDB from './config/connectdb.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { swaggerUi, swaggerSpec } from './swagger.js';
import './config/passport-jwt-strategy.js';

const app = express();
const port = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL;

// CORS setup
const allowedOrigins = [
  "http://localhost:3000",
  "https://quickvote-beta.vercel.app",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // <- Optional for preflight

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// DB connection
connectDB(DATABASE_URL);

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Upload route
app.post('/upload', upload.single('photo'), (req, res) => {
  if (req.file) {
    res.json({ message: 'File uploaded successfully', file: req.file });
  } else {
    res.status(400).json({ message: 'File upload failed' });
  }
});

// Serve uploads
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

// Root
app.get('/', (req, res) => res.send('✅ Backend is running successfully!'));

// Listen
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
