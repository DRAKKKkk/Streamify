import { asyncHandler } from "../utils/AsyncHandler.js";

const registerUser = asyncHandler(async (req, res, next) => {
    // Controller function to handle user registration.
    // asyncHandler is a middleware wrapper that catches async errors
    // and passes them to your error-handling middleware (so you don't need try/catch here).

    // For now, this is just a placeholder response.
    // In the real implementation, you'll:
    //  1. Validate incoming data from req.body (e.g., email, password, username).
    //  2. Check if the user already exists in the database.
    //  3. Hash the password and save the new user in MongoDB.
    //  4. Optionally generate access and refresh tokens.
    //  5. Send a success response with user data and tokens.

    // Sending an HTTP 500 status here usually means "Server Error".
    // For a successful registration, you should use 201 (Created) instead.
    res.status(500).json({
        message: "User registered successfully"
    });
});


export {
    registerUser,
}