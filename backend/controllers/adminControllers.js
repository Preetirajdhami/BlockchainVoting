import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import VotingStatus from '../models/VotingStatus.js'; 

dotenv.config();

class AdminController {
    // Admin login method
    static adminLogin = async (req, res) => {
        const { email, password } = req.body;

        try {
            // Check if the entered email matches the admin credentials
            if (email !== process.env.ADMIN_EMAIL) {
                return res.status(401).json({ message: 'Unauthorized: Invalid email' });
            }

            // Validate the password
            const isPasswordValid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Unauthorized: Invalid password' });
            }

            // Generate a JWT token for the admin
            const token = jwt.sign({ email: process.env.ADMIN_EMAIL }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Successful login response with token
            return res.status(200).json({ message: 'Admin logged in successfully', token });

        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({ message: 'Server error. Please try again later.' });
        }
    };

    // Voting Status Controller: Get the current voting status
    static getVotingStatus = async (req, res) => {
        try {
            let status = await VotingStatus.findOne();
            if (!status) {
                status = await VotingStatus.create({});
            }
            return res.status(200).json({ isVotingActive: status.isVotingActive });
        } catch (error) {
            console.error('Error fetching voting status:', error);
            return res.status(500).json({ message: 'Error fetching voting status.' });
        }
    };

    // Voting Status Controller: Toggle voting status (Start/Stop Voting)
    static toggleVotingStatus = async (req, res) => {
        try {
            let status = await VotingStatus.findOne();
            if (!status) {
                status = await VotingStatus.create({});
            }

            // Toggle the voting status
            status.isVotingActive = !status.isVotingActive;
            await status.save();

            return res.status(200).json({
                message: `Voting has been ${status.isVotingActive ? 'started' : 'stopped'}`,
                isVotingActive: status.isVotingActive
            });
        } catch (error) {
            console.error('Error toggling voting status:', error);
            return res.status(500).json({ message: 'Error updating voting status.' });
        }
    };
}

export default AdminController;
