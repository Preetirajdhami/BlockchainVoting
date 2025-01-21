import UserModel from "../models/User.js";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from "passport";

// Configure options for the JWT strategy
var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY 
};

// Configure the JWT strategy
passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    console.log("JWT Payload:", jwt_payload); 

    try {
        
        const user = await UserModel.findById(jwt_payload._id).select('-password');

        if (user) {
            console.log("User found:", user); 
            return done(null, user); 
        } else {
            console.log("User not found"); 
            return done(null, false); 
        }
    } catch (error) {
        console.error("Error in JWT Strategy:", error); 
        return done(error, false);
    }
}));
