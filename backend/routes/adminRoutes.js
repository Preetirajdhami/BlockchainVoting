
import express from 'express';
import AdminController from '../controllers/adminControllers.js';

const router = express.Router();

// Admin login route
router.post('/login', AdminController.adminLogin); 

router.get('/voting-status', AdminController.getVotingStatus);

// Toggle voting status
router.post('/voting-status/toggle', AdminController.toggleVotingStatus);

export default router;
