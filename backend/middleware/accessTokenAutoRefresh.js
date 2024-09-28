import refreshAccessToken from "../utils/refreshAccessToken.js";
import setTokensCookies from "../utils/setTokensCookies.js";
import isTokenExpired from '../utils/isTokenExpired.js'; // Ensure you import the token expiration check

const accessTokenAutoRefresh = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;

        console.log("Access Token:", accessToken);
        console.log("Is Access Token Expired:", accessToken ? isTokenExpired(accessToken) : 'No token found');

        // Check if access token is valid
        if (accessToken && !isTokenExpired(accessToken)) {
            req.headers['Authorization'] = `Bearer ${accessToken}`;
            return next(); // Proceed to the next middleware
        }

        // If access token is missing or expired
        const refreshToken = req.cookies.refreshToken;
        if (!accessToken || isTokenExpired(accessToken)) {
            console.log("Refresh Token:", refreshToken);
            if (!refreshToken) {
                return res.status(401).json({ message: 'Unauthorized: Refresh token is missing' });
            }

            // Attempt to refresh the access token using the refresh token
            const { newAccessToken, newRefreshToken, newAccessTokenExp, newRefreshTokenExp } = await refreshAccessToken(req, res);
            if (!newAccessToken) {
                return res.status(401).json({ message: 'Unauthorized: Unable to refresh access token' });
            }

            // Set new tokens in cookies
            setTokensCookies(res, newAccessToken, newRefreshToken, newAccessTokenExp, newRefreshTokenExp);
            req.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return next();
        }
    } catch (error) {
        console.error('Error in accessTokenAutoRefresh middleware:', error.message);
        return res.status(500).json({ message: 'Internal Server Error: ' + error.message });
    }
};

export default accessTokenAutoRefresh;
