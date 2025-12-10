import React, { useState } from 'react'
import toast from 'react-hot-toast'
const Newsletter = () => {
  const [email, setEmail] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    toast.success("Welcome to the community!");
    setEmail('');
  }

  return (
    <div className='flex flex-col items-center justify-center text-center space-y-2 my-32'>
        {}
        <h1 className='md:text-4xl text-2xl font-semibold'>Stay In The Loop.</h1>
        <p className='md:text-lg text-gray-500/70 pb-8'>
            Get the latest insights and trends delivered to your inbox.
        </p>
        
        <form onSubmit={onSubmitHandler} className='flex items-center justify-between max-w-2xl w-full md:h-13 h-12'>
            <input 
              className='border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500' 
              type="email" 
              placeholder="Enter your email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type='submit' className='md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md rounded-l-none'>
              Subscribe
            </button>
        </form>
    </div>
  )
}

export default Newsletter