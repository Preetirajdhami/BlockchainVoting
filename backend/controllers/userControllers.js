import UserModel from "../models/User.js";
import bcrypt from 'bcrypt';
import sendEmailVerificationOTP from "../utils/sendEmailVerificationOTP.js";
import EmailVerificationModel from "../models/EmailVerification.js";
import setTokensCookies from "../utils/setTokensCookies.js";
import generateTokens from "../utils/generateTokens.js";
import refreshAccessToken from "../utils/refreshAccessToken.js";


class UserController {

    // User Registration
    static userRegistration = async (req, res) => {
        try {
            // Extract request body parameters and file (photo)
            const {
                name,
                email,
                password,
                password_confirmation,
                dob,
                address,
                mobile
            } = req.body;
    
            const photo = req.file; 
    
            // Check if all required fields are provided
            if (!name || !email || !password || !password_confirmation || !dob || !address || !mobile || !photo) {
                return res.status(400).json({
                    status: "failed",
                    message: "All fields are required"
                });
            }
    
            // Check if password and password_confirmation match
            if (password !== password_confirmation) {
                return res.status(400).json({
                    status: "failed",
                    message: "Password and confirm password don't match"
                });
            }
    
            // Check if email already exists
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(409).json({
                    status: "failed",
                    message: "Email already exists"
                });
            }
    
            // Generate salt and hash password
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashedPassword = await bcrypt.hash(password, salt);
    
            // Ensure photo is uploaded correctly and get its path
            const photoPath = photo.path; 
    
            // Check if photoPath is defined
            if (!photoPath) {
                return res.status(400).json({
                    status: "failed",
                    message: "Photo upload failed"
                });
            }
    
            // Create new user
            const newUser = await new UserModel({
                name,
                email,
                password: hashedPassword,
                dob,
                address,
                mobile,
                photo: photoPath
            }).save();
    
            // Send email verification OTP
            sendEmailVerificationOTP(req, newUser);
    
            // Send success response
            res.status(201).json({
                status: "success",
                message: "Registration successful",
                user: {
                    id: newUser._id,
                    email: newUser.email
                }
            });
    
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: "failed",
                message: "Unable to register, please try again later"
            });
        }
    };
    
    //User Email Verification

    // User Email Verification (unchanged)
    static verifyEmail = async (req, res) => {
        // No changes needed here, leaving this as is
        try {
            const { email, otp } = req.body;

            if (!email || !otp) {
                return res.status(400).json({
                    status: "failed",
                    message: "All fields are required"
                });
            }

            const existingUser = await UserModel.findOne({ email });
            if (!existingUser) {
                return res.status(404).json({
                    status: "failed",
                    message: "Email doesn't exist"
                });
            }

            if (existingUser.is_verified) {
                return res.status(400).json({
                    status: "failed",
                    message: "Email is already verified"
                });
            }

            const emailVerification = await EmailVerificationModel.findOne({
                userId: existingUser._id,
                otp
            });

            if (!emailVerification) {
                await sendEmailVerificationOTP(req, existingUser);
                return res.status(400).json({
                    status: "failed",
                    message: "Invalid OTP, new OTP sent to your email"
                });
            }

            const currentTime = new Date();
            const expirationTime = new Date(emailVerification.createdAt.getTime() + 15 * 60 * 1000);

            if (currentTime > expirationTime) {
                await sendEmailVerificationOTP(req, existingUser);
                return res.status(400).json({
                    status: "failed",
                    message: "OTP expired, new OTP sent to your email"
                });
            }

            existingUser.is_verified = true;
            await existingUser.save();

            await EmailVerificationModel.deleteMany({ userId: existingUser._id });

            return res.status(200).json({
                status: "success",
                message: "Email verified successfully"
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: "failed",
                message: "Unable to verify email, please try again later"
            });
        }
    }

    // User Login (unchanged)
    static userLogin = async (req, res) => {
        
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    status: "failed",
                    message: "Email and password are required"
                });
            }

            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(404).json({
                    status: "failed",
                    message: "Invalid email or password"
                });
            }

            if (!user.is_verified) {
                return res.status(403).json({
                    status: "failed",
                    message: "Your account is not verified"
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    status: "failed",
                    message: "Invalid email or password"
                });
            }

            const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } = await generateTokens(user);

            setTokensCookies(res, accessToken, refreshToken, accessTokenExp, refreshTokenExp);

            res.status(200).json({
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    roles: user.roles[0]
                },
                status: "success",
                message: "Login successful",
                access_token: accessToken,
                refresh_token: refreshToken,
                access_token_exp: accessTokenExp,
                is_auth: true
            });

        } catch (error) {
            console.error("Login Error:", error);
            res.status(500).json({
                status: "failed",
                message: "Unable to login, please try again"
            });
        }
    }


    //Get New Access Token or refresh token
    static getNewAccessToken = async (req, res) => {
        try {
            // get new access token using  refresh token
            const {
                newAccessToken,
                newRefreshToken,
                newAccessTokenExp,
                newRefreshTokenExp
            } = await refreshAccessToken(req, res)


            //set new token  to cookie
            setTokensCookies(res, newAccessToken, newRefreshToken, newAccessTokenExp, newRefreshTokenExp)
            res.status(200).send({
                    status: "success",
                    message: "New tokens generated",
                    access_token: newAccessToken,
                    refresh_token: newRefreshToken,
                    access_token_exp: newAccessTokenExp
                }

            );
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: "failed",
                message: "Unable to generate new token, please try aain later"
            });

        }


    }


    //change password
    //profile or logged in user
    static userProfile = async (req, res) => {
        try {
          console.log('User from passport:', req.user);
          res.send({ user: req.user });
        } catch (error) {
          console.error('Error fetching user profile:', error);
          res.status(500).send({ error: 'Failed to fetch user profile' });
        }
      };
      
    



}
export default UserController;
