import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import { resourceLimits } from "worker_threads";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

const uploadOnCloudinary = async (localFilePath) => {
    // Function to upload a file from the local server storage to Cloudinary.
    // localFilePath → path to the file on the server (e.g., "./uploads/image.png")

    try {
        // 1. If no file path is provided, return null (nothing to upload).
        if (!localFilePath) return null;

        // 2. Upload the file to Cloudinary.
        //    - resource_type: "auto" lets Cloudinary detect whether it's an image, video, etc.
        //    - localFilePath: the local file location (from multer or similar).
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto", // auto-detect file type
        });

        // 3. Delete the local file after successful upload to free up space.
        //    - This is important if you store uploads temporarily on the server.
        fs.unlinkSync(localFilePath);

        // 4. Return the result object from Cloudinary (contains URL, public_id, etc.).
        return result;

    } catch (error) {
        // 5. If upload fails, log the error for debugging.
        console.error("Error uploading file to Cloudinary:", error);

        // 6. Delete the local file even if upload failed (cleanup).
        fs.unlinkSync(localFilePath);

        // 7. Return null to indicate failure.
        return null;
    }
}

const deleteOnCloudinary = async (public_id, resource_type = "image") => {
    // Function to delete a file from Cloudinary using its public_id.
    // public_id → unique identifier given by Cloudinary when the file was uploaded.
    // resource_type → type of file ("image", "video", "raw", etc.), default is "image".

    try {
        // 1. If no public_id is provided, we can't delete anything → return null.
        if (!public_id) return null;

        // 2. Call Cloudinary's destroy method to delete the file.
        //    - public_id: identifies the file to delete.
        //    - resource_type: tells Cloudinary what type of file it is.
        const result = await cloudinary.uploader.destroy(public_id, {
            resource_type: resource_type
        });

        // 3. Return Cloudinary's response (it will tell if deletion succeeded).
        return result;

    } catch (error) {
        // 4. Log the error for debugging.
        console.log("Delete on Cloudinary failed:", error);

        // 5. Return the error object so the caller knows what went wrong.
        return error;
    }
};


export {
    uploadOnCloudinary,
    deleteOnCloudinary
}
