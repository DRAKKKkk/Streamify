import {Schema, model} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "USerneme is required"],
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
            index: true
        },
        avatar: {
            type: {
                public_id: String,
                url: String // cloudinary url
            },
            required: true
        },
        coverImage: {
            type: {
                public_id: String,
                url: String // cloudinary url
            },
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, "Password is required"],
            trim: true,
            minLength: [8, "Password must be at least 6 characters long"],
        },
        refreshToken: {
            type: String
        },
    }, 
    {
        timestamps: true
    }
)

userSchema.pre("save", async function(next) {
    // This function runs automatically *before* a user document is saved to the database.

    // 1. Check if the "password" field has been modified.
    //    - This is important when updating a user: if the password hasn't changed,
    //      we don't want to re-hash it (which would break login).
    if (!this.isModified("password")) return next(); // Early exit if unchanged

    // 2. If password was created/updated, hash it using bcrypt.
    //    - `10` is the "salt rounds": higher number = stronger hash but slower save.
    //    - `this.password` is the plain-text password entered by the user.
    this.password = await bcrypt.hash(this.password, 10);

    // 3. Call `next()` to tell Mongoose:
    //    "This pre-save task is done, continue saving the document."
    next();
});

userSchema.methods = {
    comparePassword: async function(password) {
    // This method compares the plain-text password provided by the user
    // with the hashed password stored in the database for this user.

    // bcrypt.compare(plainPassword, hashedPassword) returns:
    // - true  → if the passwords match
    // - false → if they don't match
    return await bcrypt.compare(password, this.password);
},

    generateAccessToken: function() {
        // Create and return a JWT (JSON Web Token) for this user

        return jwt.sign(
            {
                // Payload: the data we embed in the token
                // This is info that can be read by anyone who has the token (not encrypted, just encoded)
                _id: this._id,           // User's unique ID from MongoDB
                email: this.email,       // User's email
                username: this.username, // User's username
                fullName: this.fullName  // User's full name
            },
            
            // Secret key: used to sign (and later verify) the token's authenticity
            // This should be stored securely in environment variables, not in code
            process.env.ACCESS_TOKEN_SECRET,
            
            {
                // Token options
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY // How long before the token becomes invalid
            }
        );
    },

    generateRefreshToken: function() {
        // Create and return a JWT refresh token for this user.
        // Refresh tokens are used to get new access tokens without logging in again.

        return jwt.sign(
            {
                // Payload: minimal info, usually just the user ID.
                // This avoids putting sensitive info in a long-lived token.
                userId: this._id
            },

            // Secret key to sign the refresh token
            process.env.REFRESH_TOKEN_SECRET,

            {
                // Expiration time for the refresh token.
                // Usually much longer than the access token (e.g., days or weeks)
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        );
    },



}

export const User = model("User", userSchema)
