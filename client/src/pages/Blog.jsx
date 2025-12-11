import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import Navbar from '../components/Navbar'
import Moment from 'moment'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { useUser } from '@clerk/clerk-react'

const Blog = () => {
  const { id } = useParams()
  const { axios } = useAppContext()
  
  // 2. Get User Info
  const { user, isSignedIn } = useUser();

  const [data, setData] = useState(null)
  const [comments, setComments] = useState([])
  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchComments = async () => {
    try {
      const { data } = await axios.post('/api/blog/comments', { blogId: id });
      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const addComment = async (e) => {
    e.preventDefault();
    
    // Logic: If logged in, use Clerk Name. If not, use Input Name.
    const commentName = isSignedIn ? (user.fullName || user.firstName) : name;
    
    if (!commentName) {
        return toast.error("Please enter a name");
    }

    try {
      const { data } = await axios.post('/api/blog/add-comment', { 
          blog: id, 
          name: commentName, 
          content 
      });
      
      if (data.success) {
        toast.success("Response added successfully"); // Changed "Comment" to "Response"
        setName('');
        setContent('');
        fetchComments(); 
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchBlogData()
    fetchComments()
  }, [id])

  return data ? (
    <div className='relative'>
      <img src={assets.gradientBackground} alt="Background" className='absolute -top-50 -z-1 opacity-70' />
      <Navbar />
      <div className='text-center mt-20 text-gray-600'>
        <p className='text-primary py-4 font-medium'>Published on {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
        
        <h2 className='my-5 max-w-2xl mx-auto px-4'>{data.subTitle}</h2>
        
        <div className='flex items-center justify-center gap-2 mb-6'>
            {data.authorImage && <img src={data.authorImage} alt="" className='w-8 h-8 rounded-full' />}
            <p className='inline-block py-1 px-4 rounded-full border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>
                {data.authorName || "Anonymous"}
            </p>
        </div>

      </div>
      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        
        {/* Cover Image: Fixed Height for consistency */}
        <img src={data.image} alt="Article Cover" className='rounded-3xl mb-5 w-full h-[500px] object-cover border border-gray-100 shadow-sm' />
        
        {/* Article Body */}
        <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{ __html: data.description }}></div>
        
        {/* Discussion Section (Rebranded from "Comments") */}
        <div className='mt-14 mb-10 max-w-3xl mx-auto'>
          <p className='font-semibold mb-4 text-gray-800'>Discussion ({comments.length})</p>
          <div className='flex flex-col gap-4'>
            {comments.map((item, index) => (
              <div key={index} className='relative bg-gray-50 border border-gray-100 max-w-xl p-4 rounded text-gray-600'>
                <div className='flex items-center gap-2 mb-2'>
                  <img src={assets.profile_icon || assets.user_icon} alt="" className='w-6' />
                  <p className='font-medium'>{item.name}</p>
                </div>
                <p className='text-sm max-w-md ml-8'>{item.content}</p>
                <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs text-gray-400'>{Moment(item.createdAt).fromNow()}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* "Join Conversation" Section (Rebranded from "Add Comment") */}
        <div className='max-w-3xl mx-auto'>
          <p className='font-semibold mb-4 text-gray-800'>Join the conversation</p>
          <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>

            {/* Smart Display: Show User Profile if Logged In, Input if Guest */}
            {isSignedIn ? (
                <div className='flex items-center gap-3 mb-2 bg-blue-50 p-2 rounded-lg pr-6'>
                    <img src={user.imageUrl} className='w-8 h-8 rounded-full' alt="user" />
                    <p className='text-gray-600 font-medium text-sm'>
                        Commenting as <span className='text-primary font-semibold'>{user.fullName || user.firstName}</span>
                    </p>
                </div>
            ) : (
                <input 
                    onChange={(e) => setName(e.target.value)} 
                    value={name} 
                    type="text" 
                    placeholder='Your Name' 
                    required 
                    className='w-full p-2 border border-gray-300 rounded outline-none' 
                />
            )}

            <textarea onChange={(e) => setContent(e.target.value)} value={content} placeholder='Share your thoughts on this article...' required className='w-full p-2 border border-gray-300 rounded outline-none h-32'></textarea>

            <button type='submit' className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'>Post Response</button>
          </form>
        </div>
        
        {/* Share Section */}
        <div className='my-24 max-w-3xl mx-auto'>
          <p className='font-semibold my-4 text-gray-800'>Share this article</p>
          <div className='flex gap-2'>
            <img src={assets.facebook_icon} width={40} alt="Facebook" className='cursor-pointer hover:scale-110 transition'/>
            <img src={assets.twitter_icon} width={40} alt="Twitter" className='cursor-pointer hover:scale-110 transition'/>
            <img src={assets.googleplus_icon} width={40} alt="Google+" className='cursor-pointer hover:scale-110 transition'/>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  ) : <Loader />
}

export default Blog