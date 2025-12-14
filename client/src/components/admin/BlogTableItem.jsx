// import React from 'react'
// import { assets } from '../../assets/assets';
// import { useAppContext } from '../../context/AppContext';
// import toast from 'react-hot-toast';

// const BlogTableItem = ({blog,fetchBlogs,index}) => {
//     const{title,createdAt}=blog;
//     const BlogDate=new Date(createdAt)

//     const {axios} = useAppContext();
//     const deleteBlog=async () => {
//       const confirm= window.confirm("Are you sure you want to delete this blog?");
//       if(!confirm) return;
//       try {
//         const {data} = await axios.post('/api/blog/delete', {id:blog._id});
//         if(data.success){
//           toast.success(data.message);
//           await fetchBlogs();
//         } else{
//           toast.error(data.message);
//         }
//       } catch (error) {
//         toast.error(error.message);
//       }
//     }

//     const togglePublish=async () => {
//       try {
//         const {data} = await axios.post('/api/blog/toggle-publish', {id:blog._id});
//         if(data.success){
//           toast.success(data.message);
//           await fetchBlogs();
//         } else{
//           toast.error(data.message);
//         }
//       } catch (error) {
//         toast.error(error.message);
//       }
//     }
//   return (
//     <tr className='border-y border-gray-300'>
//         <th className='px-2 py-4'>{index}</th>
//         <td className='px-2 py-4'>{title}</td>
//         <td className='px-2 py-4 max-sm:hidden'>{BlogDate.toDateString()}</td>
//         <td className='px-2 py-4 max-sm:hidden'>
//             <p className={`${blog.isPublished? "text-green-600":"text-orange-700"}`}>{blog.isPublished?'Published':'Unpublished'}</p>
//         </td>

//         <td className='px-2 py-4 flex text-xs gap-3'>
//             <button onClick={togglePublish} className='border px-2 py-0.5 mt-1 rounded cursor-pointer'>{blog.isPublished?'Unpublish':'Publish'}</button>
//             <img src={assets.cross_icon} alt="icon" className='w-8 hover:scale-110 transition-all cursor-pointer' onClick={deleteBlog} />
//         </td>

//     </tr>
//   )
// }

// export default BlogTableItem


import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
    const { title, createdAt, authorName, authorImage } = blog;
    const BlogDate = new Date(createdAt);

    const { axios } = useAppContext();

    const deleteBlog = async () => {
        const confirm = window.confirm("Are you sure you want to delete this blog?");
        if (!confirm) return;
        try {
            const { data } = await axios.post('/api/blog/delete', { id: blog._id });
            if (data.success) {
                toast.success(data.message);
                await fetchBlogs();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const togglePublish = async () => {
        try {
            // This endpoint now handles switching status between 'pending' and 'approved'
            const { data } = await axios.post('/api/blog/toggle-publish', { id: blog._id });
            if (data.success) {
                toast.success(blog.isPublished ? "Blog Unpublished" : "Blog Published!");
                await fetchBlogs();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <tr className='border-y border-gray-300 hover:bg-gray-50 transition'>
            <th className='px-2 py-4 text-gray-400 font-normal'>{index}</th>
            
            {/* Title & Author Info */}
            <td className='px-2 py-4'>
                <p className='font-medium text-gray-800'>{title}</p>
                {authorName && (
                    <div className='flex items-center gap-2 mt-1'>
                        <img src={authorImage || assets.profile_icon} className='w-5 h-5 rounded-full' alt="" />
                        <span className='text-xs text-gray-500'>{authorName}</span>
                    </div>
                )}
            </td>

            <td className='px-2 py-4 max-sm:hidden text-gray-500'>{BlogDate.toDateString()}</td>
            
            {/* Status Badge */}
            <td className='px-2 py-4 max-sm:hidden'>
                <span className={`px-3 py-1 rounded-full text-xs font-medium 
                    ${blog.isPublished 
                        ? "bg-green-100 text-green-700 border border-green-200" 
                        : "bg-yellow-100 text-yellow-700 border border-yellow-200"}`}>
                    {blog.isPublished ? 'Published' : 'Pending'}
                </span>
            </td>

            {/* Action Buttons */}
            <td className='px-2 py-4'>
                <div className='flex items-center gap-3'>
                    <button 
                        onClick={togglePublish} 
                        className={`text-xs px-3 py-1 rounded border transition cursor-pointer 
                        ${blog.isPublished 
                            ? 'border-gray-300 text-gray-600 hover:bg-gray-100' 
                            : 'border-green-600 bg-green-600 text-white hover:bg-green-700'}`}>
                        {blog.isPublished ? 'Unpublish' : 'Approve'}
                    </button>
                    
                    <img 
                        src={assets.cross_icon} 
                        alt="delete" 
                        // className='w-4 hover:scale-110 transition cursor-pointer' 
                        className='w-4 cursor-pointer hover:scale-110 transition brightness-100 hover:brightness-90 saturate-[1500%]' 
                        onClick={deleteBlog} 
                    />
                </div>
            </td>
        </tr>
    )
}

export default BlogTableItem