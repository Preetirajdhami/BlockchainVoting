import express from 'express';
const router = express.Router();
import UserController from '../controllers/userControllers.js';

import passport from 'passport';

import accessTokenAutoRefresh from '../middlewares/accessTokenAutoRefresh.js';
import upload from '../middlewares/registerPhoto.js';

// import setAuthHeader from '../middlewares/setAuthHeader.js';



//public Routes
router.post('/register',upload.single('photo'), UserController.userRegistration )
router.post('/verify-email', UserController.verifyEmail)
router.post('/login', UserController.userLogin)
router.post('/refresh-token', UserController.getNewAccessToken)


// protected routes
router.get('/me', accessTokenAutoRefresh ,passport.authenticate('jwt', { session:false}), UserController.userProfile);




export default router