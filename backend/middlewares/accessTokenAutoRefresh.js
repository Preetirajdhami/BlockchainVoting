import refreshAccessToken from "../utils/refreshAccessToken.js";
import setTokensCookies from "../utils/setTokensCookies.js";
import isTokenExpired from '../utils/isTokenExpired.js';
//this middleware will set authorization header and will refresh access token on 
//expire 

const accessTokenAutoRefresh = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;

        console.log("Access Token:", accessToken);
        console.log(
            "Is Access Token Expired:",
            accessToken ? isTokenExpired(accessToken) : "No token found"
        );

        // Check if the access token is valid
        if (accessToken && !isTokenExpired(accessToken)) {
            req.headers["authorization"] = `Bearer ${accessToken}`;
            console.log("authorization Header Set:", req.headers["authorization"]);
            return next(); 
        }

        // Handle missing or expired access token
        const refreshToken = req.cookies.refreshToken;
        console.log("Refresh Token:", refreshToken);

        if (!refreshToken) {
            return res.status(401).json({
                message: "Unauthorized: Refresh token is missing"
            });
        }

        // Refresh the access token
        console.log("Refreshing access token...");
        const {
            newAccessToken,
            newRefreshToken,
            newAccessTokenExp,
            newRefreshTokenExp,
        } = await refreshAccessToken(req, res);

        if (!newAccessToken) {
            console.log("Failed to refresh access token.");
            return res
                .status(401)
                .json({
                    message: "Unauthorized: Unable to refresh access token"
                });
        }

        // Set new tokens in cookies
        setTokensCookies(res, newAccessToken, newRefreshToken, newAccessTokenExp, newRefreshTokenExp);
        console.log("New Access Token Set:", newAccessToken);

        // Update authorization header with the new access token
        req.headers["authorization"] = `Bearer ${newAccessToken}`;
        console.log("Updated authorization Header Set:", req.headers["authorization"]);

        return next(); 
    } catch (error) {
        console.error("Error in accessTokenAutoRefresh middleware:", error.message);
        return res.status(500).json({
            message: "Internal Server Error: " + error.message
        });
    }
};

export default accessTokenAutoRefresh;