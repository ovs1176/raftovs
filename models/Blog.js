import mongoose from "mongoose";


// defining Schema
const blogSchema = mongoose.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    bg_img: String,
    date_created: {
        type: Date,
        default : Date.now
    },
    date_published: Date,
    created_by: { type: String, trim: true }, 
    reviewed_by: { type: String, default : "NULL"},

    tags: [{
        type: String,
        trim: true
    }],
    isDeleted: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isReviewed: {
        type: Boolean,
        default: false
    },
    isPaid: {
        type: Boolean,
        default: false
    }
})


// defining model
const BlogsModel = mongoose.model("Blog", blogSchema);

export default BlogsModel;