import {Schema, model} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoSchema = new Schema(
    {
        videoFile: {
            type: {
                public_id: String,
                url: String // cloudinary url
            },
            required: true,
        },
        
    }
)