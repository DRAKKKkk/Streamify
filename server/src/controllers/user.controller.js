import { asyncHandler } from "../utils/AsyncHandler.js";

const registerUser = asyncHandler( async(req, res) => {
    // get user details from frontend
    // validation - not empty etc...
    // check if user already exists: username, email
    // check for images, avatar
    // upload to cloudinary, avatar check
    // create user object - create entry in db
    // remove password and refresh token from response
    // check for user creation
    // return response

    const {username, email, fullName, password} = req.body

    if ([username, email, fullName, password].some(
        (field) => ( field?.trim() === "" )
    )) {
        throw new ApiError(400, "All fields are required")
    }

    const userExists = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (userExists) throw new ApiError(409, "user with username or email already exists")

    // console.log("req.files", req.files);

    const avatarLocalPath = req.files?.avatar[0]?.path
    // console.log("avatarLocalPath", avatarLocalPath);

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if (!avatarLocalPath) throw new ApiError(400, "Avatar file is required")

    const avatar = await uploadOnCloudinary(avatarLocalPath).catch((error) => console.log(error))
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    // console.log(avatar);null
    if (!avatar) throw new ApiError(400, "Avatar file is required!!!.")

    const user = await User.create({
        fullName,
        avatar: {
            public_id: avatar.public_id,
            url: avatar.secure_url
        },
        coverImage: {
            public_id: coverImage?.public_id || "",
            url: coverImage?.secure_url || ""
        },
        username: username.toLowerCase(),
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) throw new ApiError(500, "user registration failed, please try again")

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered successfully")
    )

});



export {
    registerUser,
}