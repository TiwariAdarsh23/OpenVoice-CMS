import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../assets/assets'
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; 
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { parse } from 'marked';
import { useUser } from '@clerk/clerk-react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const { axios } = useAppContext();
  const { user, isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const wrapperRef = useRef(null); 
  const quillRef = useRef(null);
  
  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('Startup');

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
        navigate('/');
        toast.error("Please login to write a blog");
    }
  }, [isLoaded, isSignedIn, navigate]);

  useEffect(() => {
    if (!wrapperRef.current) return;
    wrapperRef.current.innerHTML = "";
    const editorDiv = document.createElement('div');
    wrapperRef.current.append(editorDiv);
    quillRef.current = new Quill(editorDiv, { 
      theme: 'snow',
      modules: {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link']
        ]
      }
    });
    return () => {
        quillRef.current = null;
        if (wrapperRef.current) wrapperRef.current.innerHTML = "";
    };
  }, []);

  const generateContent = async () => {
    if (!quillRef.current) return toast.error("Editor is loading...");
    if (!title) return toast.error('Please enter a title');
    try {
      setLoading(true);
      const { data } = await axios.post('/api/blog/generate', { prompt: title });
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!quillRef.current) return;
      setIsAdding(true);
      const blog = {
        title, subTitle, description: quillRef.current.root.innerHTML, category,
        authorId: user.id, authorName: user.fullName || user.firstName, authorImage: user.imageUrl, isPublished: false 
      }
      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog));
      formData.append('image', image);
      const { data } = await axios.post('/api/blog/add', formData);
      if (data.success) {
        toast.success("Article submitted for review!");
        navigate('/'); 
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  }

  if (!isLoaded) return <div className='p-10'>Loading...</div>;

  return (
    <>
    <Navbar />
    <div className='flex justify-center bg-blue-50/50 min-h-screen py-10'>
      
      <form onSubmit={onSubmitHandler} className='flex flex-col bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded h-fit'>
        
        {}
        <h1 className='text-2xl font-bold mb-6 text-gray-800'>Draft New Article</h1>

        <p className='mb-2 font-medium'>Cover Image</p>
        <label htmlFor="image">
          <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="Upload" className='mt-2 h-16 rounded cursor-pointer object-cover' />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        </label>

        <p className='mt-4 font-medium'>Article Title</p>
        <input type="text" placeholder='Title' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={e => setTitle(e.target.value)} value={title}/>

        <p className='mt-4 font-medium'>Subtitle</p>
        <input type="text" placeholder='Subtitle' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={e => setSubTitle(e.target.value)} value={subTitle}/>

        <p className='mt-4 font-medium'>Content</p>
        <div className='max-w-lg h-80 pb-16 sm:pb-10 pt-2 relative mb-6'>
            <div className='h-full bg-white border border-gray-300 rounded overflow-hidden'>
                 <div ref={wrapperRef} style={{ height: '100%' }}></div>
            </div>
            {loading && <div className='absolute right-0 top-0 left-0 bottom-0 flex items-center justify-center bg-black/10 mt-2 z-20'><div className='w-8 h-8 rounded-full border-2 border-t-white animate-spin border-gray-500'></div></div>}
            <button disabled={loading} type='button' onClick={generateContent} className='absolute bottom-2 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer z-10'>{loading ? 'Generating...' : 'Generate with AI'}</button>
        </div>

        <p className='mt-4 font-medium'>Category</p>
        <select onChange={e => setCategory(e.target.value)} name="category" className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded w-full max-w-lg'>
          <option value="">Select Topic</option>
          {blogCategories.map((item, index) => <option key={index} value={item}>{item}</option>)}
        </select>

        {}
        <button 
            disabled={isAdding} 
            type='submit' 
            className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm font-medium hover:scale-105 transition-all block'
        >
            {isAdding ? 'Submitting...' : 'Submit Article'}
        </button>

      </form>
    </div>
    </>
  )
}

export default CreatePost