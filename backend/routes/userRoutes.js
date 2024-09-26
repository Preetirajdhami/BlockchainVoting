import express from 'express';
const router = express.Router();
import UserController from '../controllers/userControllers.js';
import setAuthHeader from '../middleware/setAuthHeader.js';
import passport from 'passport';
import upload from '../middleware/registerPhoto.js';



//public Routes
router.post('/register',upload.single('photo'), UserController.userRegistration )
router.post('/verify-email', UserController.verifyEmail)
router.post('/login', UserController.userLogin)
router.post('/refresh-token', UserController.getNewAccessToken)


// protected routes
router.get('/me', setAuthHeader, passport.authenticate('jwt',{session: false}), UserController.userProfile);




export default router