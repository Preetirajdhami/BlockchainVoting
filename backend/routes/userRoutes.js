import express from 'express';
const router = express.Router();
import UserController from '../controllers/userControllers.js';
import passport from 'passport';
import setAuthHeader from '../middleware/setAuthHeader.js';


//public Routes
router.post('/register', UserController.userRegistration )
router.post('/verify-email', UserController.verifyEmail)
router.post('/login', UserController.userLogin)
router.post('/refresh-token', UserController.getNewAccessToken)


// protected routes
router.get('/me', setAuthHeader, passport.authenticate('jwt',{session:false}), UserController.userProfile)




export default router