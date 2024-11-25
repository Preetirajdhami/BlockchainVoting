const setTokensCookies = (res, accessToken, refreshToken,
     newAccessTokenExp, newRefreshTokenExp) =>{
        const accessTokenMaxAge = (newAccessTokenExp - Math.floor(Date.now()/1000))*1000;
        const refreshTokenMaxAge = (newRefreshTokenExp - Math.floor(Date.now()/1000))*1000;

        //Set Cookie for Access Token 
        res.cookie('accessToken', accessToken,{
           
            httpOnly: true,
            secure: true,
            maxAge: accessTokenMaxAge,
        });

        //Set Cookie for Refresh Token 
        res.cookie('refreshToken', refreshToken,{
           
            httpOnly: true,
            secure: true,
            maxAge: refreshTokenMaxAge,
        });

} 
 export default setTokensCookies