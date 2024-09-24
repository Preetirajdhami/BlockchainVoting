
import express from 'express';
import AdminController from '../controllers/adminControllers.js';

const router = express.Router();

// Admin login route
router.post('/login', AdminController.adminLogin); 

export default router;
