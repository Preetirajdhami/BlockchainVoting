import jwt from 'jsonwebtoken';

const isTokenExpired = (token) => {
    if (!token) {
        return true; // No token provided
    }

    const decodedToken = jwt.decode(token);
    
    // Check if the token was decoded and has an expiration field
    if (!decodedToken || !decodedToken.exp) {
        return true; // Invalid or no expiration in token, consider it expired
    }

    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime; // Return true if token is expired

    
};

export default isTokenExpired;
