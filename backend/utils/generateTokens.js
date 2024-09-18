import jwt from "jsonwebtoken";
import UserRefreshTokenModel from "../models/UserRefreshToken.js";
const generateTokens = async (user) => {
    try {
        const payload = {
            _id: user._id,
            roles: user.roles
        };

        //generate  access token with expiration time
        const accessTokenExp = Math.floor(Date.now() / 1000) + 100;
        // Set expiration to 10 seconds fro now

        const accessToken = jwt.sign({
                ...payload,
                exp: accessTokenExp
            },
            process.env.JWT_ACCESS_TOKEN_SECRET_KEY
        );

        //Generate refresh token with expiration time
        const refreshTokenExp = Math.floor(Date.now()/1000) + 60 * 60 * 24 * 5;
        const refreshToken = jwt.sign(
            {
                ...payload, exp: refreshTokenExp
            },
            process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
        );

       // const userRefreshToken =  await UserRefreshTokenModel.findOne({userId: user._id});
        //if(userRefreshToken) await userRefreshToken.remove();

        const userRefreshToken = await UserRefreshTokenModel.findOneAndDelete({ userId: user._id})
        //save new refresh token
        await new UserRefreshTokenModel({userId: user._id, token: refreshToken}).save();

        return Promise.resolve({ accessToken, refreshToken, accessTokenExp, refreshTokenExp});

    } catch (error) {
        return Promise.reject(error);

    }
}
export default generateTokens 