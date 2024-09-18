// this middleware will set Autherization Header

import isTokenExpired from '../utils/isTokenExpired.js';

const setAuthHeader =  async (req, res, next) => {
    try{
        const accessToken = req.cookies.accessToken;
        if(accessToken || !isTokenExpired(accessToken)){
            req.headers['Authorization'] =`Bearer ${accessToken}`
        }
        next()
    } catch (error){
        console.error('Error adding access token to header :', error.message);

    }
}
export default setAuthHeader