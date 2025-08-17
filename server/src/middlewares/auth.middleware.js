import JWT from 'jsonwebtoken';
import asyncHandler from '../utils/AsyncHandler.js';
import ApiError from '../utils/apiError.js';
import { User } from '../models/user.model.js';

export const verifyJWT = asyncHandler(async(req, _, next) => {
    try {
        const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        // there are two common ways to send access tokens in HTTP requests:
        // 1. As a cookie (req.cookies.accessToken)
        // 2. In the Authorization header (req.header("Authorization").replace("Bearer ", ""))


        if (!accessToken) {
            throw new ApiError(401, "Unauthorized request");
        }
    
        const decodedToken = JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decodedToken?._id).select(" -password -refreshToken");
        // exclude password and refreshToken from the user object when retrieving from database

        if (!user) {
            throw new ApiError(401, "Invalid access token");
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});
