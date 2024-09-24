import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

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

        console.log('Attempting to validate password');
        console.log('Provided password:', password);

        // Use bcrypt to compare the password (assuming it's hashed)
        const isPasswordValid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);

        console.log('Is password valid:', isPasswordValid);

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
}

export default AdminController;
