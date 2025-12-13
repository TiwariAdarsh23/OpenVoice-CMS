// import fs from 'fs';
// import imagekit from '../configs/imageKit.js';
// import Blog from '../models/Blog.js';
// import Comment from '../models/Comment.js';
// import main from '../configs/gemini.js';
// export const addBlog=async (req, res) => {
//     try{
//         const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
//         const imageFile = req.file;
//         if (!title || !description || !category || !imageFile) {
//             return res.json({ success: false, message: "Missing required fields" });
//         }
//         const fileBuffer = fs.readFileSync(imageFile.path);
//         // Upload image to ImageKit
//         const response = await imagekit.upload({
//             file: fileBuffer,
//             fileName: imageFile.originalname,
//             folder: "/blogs"
//         })

//         // optimization through imagekit URL transformation
//         const optimizedImageUrl = imagekit.url({
//             path: response.filePath,
//             transformation: [
//                 {quality: 'auto'}, // Auto compression
//                 {format: 'webp'}, // Convert to WebP format or modern format
//                 {width: '1280'} // width Resizing
//             ]
//         });
//         // Create blog object
//         const image = optimizedImageUrl;
//         await Blog.create({title,subTitle,description,category,image,isPublished})
//         res.json({ success: true, message: "Blog added successfully" });

//     }catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }
// export const getAllBlogs=async (req, res) => {
//     try {
//         // const blogs = await Blog.find({isPublished: true}).sort({createdAt: -1});
//         const blogs = await Blog.find({isPublished: true});
//         res.json({ success: true, blogs });
//     }
//     catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }
// export const getBlogById = async (req, res) => {
//     try {
//         const {blogId } = req.params;
//         const blog = await Blog.findById(blogId)
//         if (!blog) {
//             return res.json({ success: false, message: "Blog not found" });
//         }
//         res.json({ success: true, blog });
//     }
//     catch (error) {
//         res.json({ success: false, message: error.message });
//     }               
// }
// export const deleteBlogById = async (req, res) => {
//     try {
//         const { id} = req.body;
//         await Blog.findByIdAndDelete(id);
//         // Delete all comments associated with the blog
//         await Comment.deleteMany({ blog: id });
//         res.json({ success: true, message: "Blog deleted successfully" });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }
// export const togglePublish= async (req, res) => {
//     try {
//         const { id} = req.body;
//         const blog = await Blog.findById(id);
//         blog.isPublished = !blog.isPublished;
//         await blog.save();
//         res.json({ success: true, message: "Blog status updated"})
//     } catch (error) {
//         res.json({ success: false, message: error.message });   
//     }
// }
// export const addComment = async (req, res) => {
//     try {
//         const { blog,name,content} = req.body;
//         await Comment.create({ blog, name, content });
//         res.json({ success: true, message: "Comment added for review" });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }   
// } 
// export const getBlogComments = async (req, res) => {
//     try {
//         const { blogId } = req.body;
//         const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });
//         res.json({ success: true, comments });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }   
// }

// export const generateContent = async (req, res) => {
//     try {
//         const { prompt } = req.body;
//         const content=await main(prompt+'Generate a blog content for this topic in simple text format')
//         res.json({ success: true, content });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }       
// }















// import fs from 'fs';
// import imagekit from '../configs/imageKit.js';
// import Blog from '../models/Blog.js';
// import Comment from '../models/Comment.js';
// import main from '../configs/gemini.js';

// export const addBlog = async (req, res) => {
//     try {
//         // Parse the incoming data
//         const { title, subTitle, description, category, authorName, authorImage, authorId } = JSON.parse(req.body.blog);
//         const imageFile = req.file;

//         if (!title || !description || !category || !imageFile) {
//             return res.json({ success: false, message: "Missing required fields" });
//         }

//         const fileBuffer = fs.readFileSync(imageFile.path);
        
//         // Upload image to ImageKit
//         const response = await imagekit.upload({
//             file: fileBuffer,
//             fileName: imageFile.originalname,
//             folder: "/blogs"
//         });

//         // Image optimization
//         const optimizedImageUrl = imagekit.url({
//             path: response.filePath,
//             transformation: [
//                 { quality: 'auto' },
//                 { format: 'webp' },
//                 { width: '1280' }
//             ]
//         });

//         // Create blog with PENDING status
//         await Blog.create({
//             title,
//             subTitle,
//             description,
//             category,
//             image: optimizedImageUrl,
//             isPublished: false, // Hidden by default
//             status: 'pending',  // Waiting for Admin
//             authorId,           // Clerk ID
//             authorName,
//             authorImage
//         });

//         res.json({ success: true, message: "Blog submitted for review!" });

//     } catch (error) {
//         console.error(error);
//         res.json({ success: false, message: error.message });
//     }
// }

// // export const getAllBlogs = async (req, res) => {
// //     try {
// //         // PUBLIC VIEW: Only show Approved blogs
// //         const blogs = await Blog.find({ status: 'approved' }).sort({ createdAt: -1 });
// //         res.json({ success: true, blogs });
// //     } catch (error) {
// //         res.json({ success: false, message: error.message });
// //     }
// // }
// export const getAllBlogs = async (req, res) => {
//     try {
//         // CHANGED: We use 'isPublished: true' instead of 'status: approved'
//         // This ensures your OLD blogs (which have isPublished: true but no status) 
//         // AND your NEW approved blogs show up correctly.
//         const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
//         res.json({ success: true, blogs });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }
// export const getBlogById = async (req, res) => {
//     try {
//         const { blogId } = req.params;
//         const blog = await Blog.findById(blogId);
//         if (!blog) {
//             return res.json({ success: false, message: "Blog not found" });
//         }
//         res.json({ success: true, blog });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }

// export const deleteBlogById = async (req, res) => {
//     try {
//         const { id } = req.body;
//         await Blog.findByIdAndDelete(id);
//         await Comment.deleteMany({ blog: id });
//         res.json({ success: true, message: "Blog deleted successfully" });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }

// export const togglePublish = async (req, res) => {
//     try {
//         const { id } = req.body;
//         const blog = await Blog.findById(id);
        
//         // Toggle logic: If published -> unpublish. If pending -> approve.
//         blog.isPublished = !blog.isPublished;
//         blog.status = blog.isPublished ? 'approved' : 'pending';
        
//         await blog.save();
//         res.json({ success: true, message: `Blog ${blog.status}` });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }

// export const addComment = async (req, res) => {
//     try {
//         const { blog, name, content } = req.body;
//         await Comment.create({ blog, name, content });
//         res.json({ success: true, message: "Comment added for review" });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }

// export const getBlogComments = async (req, res) => {
//     try {
//         const { blogId } = req.body;
//         const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });
//         res.json({ success: true, comments });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }

// export const generateContent = async (req, res) => {
//     try {
//         const { prompt } = req.body;
//         // Make sure 'main' function is imported correctly from gemini.js
//         const content = await main(prompt + 'Generate a blog content for this topic in simple text format');
//         res.json({ success: true, content });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }









import fs from 'fs';
import imagekit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import main from '../configs/gemini.js';

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, authorName, authorImage, authorId } = JSON.parse(req.body.blog);
        const imageFile = req.file;

        if (!title || !description || !category || !imageFile) {
            return res.json({ success: false, message: "Missing required fields" });
        }

        const fileBuffer = fs.readFileSync(imageFile.path);
        
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        });

        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { quality: 'auto' },
                { format: 'webp' },
                { width: '1280' }
            ]
        });

        await Blog.create({
            title,
            subTitle,
            description,
            category,
            image: optimizedImageUrl,
            isPublished: false, 
            status: 'pending',  
            authorId,           
            authorName,
            authorImage
        });

        // CHANGED: "Blog submitted..." -> "Article submitted..."
        res.json({ success: true, message: "Article submitted for review!" });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
        res.json({ success: true, blogs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            // CHANGED: "Blog not found" -> "Article not found"
            return res.json({ success: false, message: "Article not found" });
        }
        res.json({ success: true, blog });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.body;
        await Blog.findByIdAndDelete(id);
        await Comment.deleteMany({ blog: id });
        // CHANGED: "Blog deleted..." -> "Article deleted..."
        res.json({ success: true, message: "Article deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);
        
        blog.isPublished = !blog.isPublished;
        blog.status = blog.isPublished ? 'approved' : 'pending';
        
        await blog.save();
        // CHANGED: "Blog..." -> "Article..."
        res.json({ success: true, message: `Article ${blog.status}` });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const addComment = async (req, res) => {
    try {
        const { blog, name, content } = req.body;
        await Comment.create({ blog, name, content });
        // CHANGED: "Comment..." -> "Response..."
        res.json({ success: true, message: "Response added for review" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.body;
        const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });
        res.json({ success: true, comments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const generateContent = async (req, res) => {
    try {
        const { prompt } = req.body;
        // CHANGED: "Generate a blog..." -> "Generate an article..."
        const content = await main(prompt + 'Generate an article content for this topic in simple text format');
        res.json({ success: true, content });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}