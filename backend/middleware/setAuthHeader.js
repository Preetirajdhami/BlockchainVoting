import isTokenExpired from '../utils/isTokenExpired.js';

const setAuthHeader = async (req, res, next) => {
    try {
        // console.log("Cookies in Request:", req.cookies); 
        const accessToken = req.cookies.accessToken;

        // Log the accessToken and expiration check for debugging
        // console.log("Access Token:", accessToken);
        if (accessToken) {
            console.log("Is Token Expired:", isTokenExpired(accessToken));
        } else {
            console.log("No accessToken found in cookies");
        }

        // Check if the accessToken exists and is not expired
        if (accessToken || !isTokenExpired(accessToken)) {
            // Set Authorization header if token is valid
            req.headers['Authorization'] = `Bearer ${accessToken}`;
            // console.log("Authorization header set:", req.headers['Authorization']);
            next(); // Continue to the next middleware or route handler
        } else {
            console.log("Unauthorized: Token is missing or expired");
            return res.status(401).json({ message: 'Unauthorized: Token is missing or expired' });
        }
    } catch (error) {
        console.error('Error adding access token to header:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default setAuthHeader;
