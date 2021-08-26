const mongoose = require("mongoose")
const PostModel = mongoose.Schema(
    {
        uId : String,
        title : String,
        created_on: {
            type : Date,
            default : Date.now
        }
    }
)

const postModel = mongoose.model("items",PostModel)

module.exports = postModel