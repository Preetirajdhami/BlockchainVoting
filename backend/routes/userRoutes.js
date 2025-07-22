import express from 'express';
const router = express.Router();
import UserController from '../controllers/userControllers.js';

import passport from 'passport';
import accessTokenAutoRefresh from '../middlewares/accessTokenAutoRefresh.js';
import upload from '../middlewares/registerPhoto.js';

// 📌 Public Routes

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/register', upload.single('photo'), UserController.userRegistration);

/**
 * @swagger
 * /verify-email:
 *   post:
 *     summary: Verify user's email with OTP
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 */
router.post('/verify-email', UserController.verifyEmail);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [User]
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
 */
router.post('/login', UserController.userLogin);

/**
 * @swagger
 * /refresh-token:
 *   post:
 *     summary: Get a new access token using refresh token
 *     tags: [User]
 *     responses:
 *       200:
 *         description: New access token issued
 */
router.post('/refresh-token', UserController.getNewAccessToken);

// 📌 Protected Routes

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get logged-in user's profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved
 *       401:
 *         description: Unauthorized
 */
router.get(
    '/me',
    accessTokenAutoRefresh,
    passport.authenticate('jwt', {
        session: false
    }),
    UserController.userProfile
);

export default router;