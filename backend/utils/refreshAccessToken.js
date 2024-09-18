import UserRefreshTokenModel from "../models/UserRefreshToken.js";
import verifyRefreshToken from "./verifyRefreshToken.js";
import generateTokens from "./generateTokens.js";
import UserModel from "../models/User.js";

const refreshAccessToken = async(req, res )=>{
    try {
        const oldRefreshToken = req.cookies.refreshToken;
        //verify refresh token is vald or not 
       const {tokenDetails, error} = await verifyRefreshToken(oldRefreshToken)

       if(error){
        return res.status(401).send({status: "failed", message: "Invalid refresh token"});
       }
        
       // Find User based on Refresh Token detail id 
       const user = await UserModel.findById(tokenDetails._id) 

       if(!user){
        return res.status(404).send({status: "failed", message: "User not found"});
       }

       const userRefreshToken =  await UserRefreshTokenModel.findOne({userId : tokenDetails._id})

       if(oldRefreshToken !== userRefreshToken.token || userRefreshToken.blacklisted){
        return res.status(401).send({status:"failed", message:"Unauthorized access"});
       }

       //Generate new access and refresh tokens
       const {accessToken, refreshToken,accessTokenExp, refreshTokenExp } = await generateTokens(user);
       generateTokens(user);

       return{
        newAccessToken: accessToken, 
        newRefreshToken: refreshToken,
        newAccessTokenExp : accessTokenExp,
        newRefreshTokenExp : refreshTokenExp
       };

        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: "failed",
            message: "Internal server error"
        });

    }    

}
export default refreshAccessToken