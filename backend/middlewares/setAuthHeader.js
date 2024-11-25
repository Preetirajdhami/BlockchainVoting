// import isTokenExpired from "../utils/isTokenExpired.js";

// const setAuthHeader = async (req, res, next) => {
//     try {
//         const accessToken = req.cookies.accessToken;

//         // Check if the accessToken exists and is not expired
//         if (accessToken && !isTokenExpired(accessToken)) {
//             req.headers['authorization'] = `Bearer ${accessToken}`;
//             console.log("Authorization header set:", req.headers['authorization']);
//         } else {
//             console.log("No valid access token found or token is expired.");
//         }

//         next();
//     } catch (error) {
//         console.error('Error adding access token to header:', error.message);
//         res.status(500).json({
//             message: "Internal Server Error: " + error.message,
//         });
//     }
// };

// export default setAuthHeader;
