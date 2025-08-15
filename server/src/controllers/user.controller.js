import { asyncHandler } from "../utils/AsyncHandler.js";

const registerUser = asyncHandler ( async (req, res, next) => {
    res.status(500).json({
        message: "User registered successfully"
    })
})

export {
    registerUser,
}