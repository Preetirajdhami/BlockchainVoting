import UserModel from "../models/User.js";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from "passport";

// Configure options for the JWT strategy
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extracts JWT from the Authorization header
    secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY // Secret key for verifying the token
};

// Configure the JWT strategy
passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    console.log("JWT Payload:", jwt_payload); // Log the JWT payload for debugging

    try {
        // Find the user in the database using the ID from the JWT payload
        const user = await UserModel.findById(jwt_payload._id).select('-password');

        if (user) {
            console.log("User found:", user); // Log the found user
            return done(null, user); // Successful authentication
        } else {
            console.log("User not found"); // Log if the user does not exist
            return done(null, false); // No user found, return false
        }
    } catch (error) {
        console.error("Error in JWT Strategy:", error); // Log any error encountered
        return done(error, false); // Return the error
    }
}));
