import express from 'express';
import AdminController from '../controllers/adminControllers.js';
const router = express.Router();


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
router.post('/login', AdminController.adminLogin);

/**
 * @swagger
 * /voting-status:
 *   get:
 *     summary: Get current voting status
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Voting status retrieved
 */
router.get('/voting-status', AdminController.getVotingStatus);

/**
 * @swagger
 * /voting-status/toggle:
 *   post:
 *     summary: Toggle voting status
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Voting status toggled
 */
router.post('/voting-status/toggle', AdminController.toggleVotingStatus);


export default router;