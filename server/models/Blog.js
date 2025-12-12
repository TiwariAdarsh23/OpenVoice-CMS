import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subTitle: { type: String },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },

    status: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected'], 
        default: 'pending' 
    },
    isPublished: { type: Boolean, default: false },
    authorId: { type: String, required: true }, 
    authorName: { type: String },              
    authorImage: { type: String },
}, { timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;