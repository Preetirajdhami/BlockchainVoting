import UserModel from "../models/User.js";
import bcrypt from 'bcrypt';
import sendEmailVerificationOTP from "../utils/sendEmailVerificationOTP.js";
import EmailVerificationModel from "../models/EmailVerification.js";
import setTokensCookies from "../utils/setTokensCookies.js";
import generateTokens from "../utils/generateTokens.js";
import refreshAccessToken from "../utils/refreshAccessToken.js";
import fs from 'fs';  // For handling file system operations

class UserController {

    // User Registration
    static userRegistration = async (req, res) => {
        try {
            // Extract request body parameters
            const {
                name,
                email,
                password,
                password_confirmation,
                date_of_birth,
                address,
                mobile
            } = req.body;

            // Extract file (photo)
            const photo = req.file;  // Assuming you're using Multer for handling file uploads

            // Check if all required fields are provided
            if (!name || !email || !password || !password_confirmation || !date_of_birth || !address || !mobile) {
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

            // Handle file upload for photo (optional)
            let photoPath = null;
            if (photo) {
                photoPath = `/uploads/photos/${photo.filename}`;  // Save the file path to store in DB
            }

            // Create new user with the additional fields
            const newUser = await new UserModel({
                name,
                email,
                password: hashedPassword,
                date_of_birth,
                address,
                mobile,
                photo: photoPath
            }).save();

            // Send verification OTP
            sendEmailVerificationOTP(req, newUser);

            // Send success response
            res.status(201).json({
                status: "success",
                message: "Registration Success",
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
    }

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
        // No changes needed here, leaving this as is
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

    // Other methods (unchanged)
}

export default UserController;
