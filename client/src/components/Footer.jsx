import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const { setMenu } = useAppContext();
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
      setMenu(category);
      navigate('/');
      window.scrollTo(0, 0);
  }

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-gray-50 border-t border-gray-200 mt-20'>
        <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-12'>
            
            {/* 1. Logo & Description */}
            <div className='w-full md:w-1/3'>
                <img src={assets.logo} alt='logo' className='w-45 mb-4'/>
                <p className='text-sm text-gray-500 leading-relaxed'>
                    A space for thinkers, creators, and storytellers. Read the latest insights on technology, startups, and lifestyle trends from our community of writers.
                </p>
            </div>

            <div className='flex flex-wrap justify-end gap-10 md:gap-20 w-full md:w-2/3'>
                
                {/* 2. Company Section */}
                <div>
                    <h3 className='font-semibold text-gray-900 mb-4'>Company</h3>
                    <ul className='text-sm text-gray-500 space-y-2'>
                        <li><button onClick={() => { navigate('/'); window.scrollTo(0,0); }} className='hover:text-primary transition'>Home</button></li>
                        <li><button className='hover:text-primary transition'>About Us</button></li>
                        <li><button className='hover:text-primary transition'>Contact</button></li>
                        <li><button className='hover:text-primary transition'>Careers</button></li>
                    </ul>
                </div>

                {/* 3. Explore Section (Functional) */}
                <div>
                    <h3 className='font-semibold text-gray-900 mb-4'>Explore</h3>
                    <ul className='text-sm text-gray-500 space-y-2'>
                        <li><button onClick={() => handleCategoryClick('Startup')} className='hover:text-primary transition'>Startup</button></li>
                        <li><button onClick={() => handleCategoryClick('Technology')} className='hover:text-primary transition'>Technology</button></li>
                        <li><button onClick={() => handleCategoryClick('Lifestyle')} className='hover:text-primary transition'>Lifestyle</button></li>
                        <li><button onClick={() => handleCategoryClick('Finance')} className='hover:text-primary transition'>Finance</button></li>
                        <li><button onClick={()=>{navigate('/admin');window.scrollTo(0, 0);}}className='hover:text-primary transition'>Admin Portal</button></li>
                    </ul>
                </div>

                {/* 4. Follow Us Section */}
                <div>
                    <h3 className='font-semibold text-gray-900 mb-4'>Follow Us</h3>
                    <ul className='text-sm text-gray-500 space-y-2'>
                        <li><a href='https://github.com/TiwariAdarsh23' target='_blank' rel='noreferrer' className='hover:text-primary transition'>GitHub</a></li>
                        <li><a href='https://www.linkedin.com/in/adarsh-tiwari-23a11t2004' target='_blank' rel='noreferrer' className='hover:text-primary transition'>LinkedIn</a></li>
                        <li><a href='https://www.instagram.com/mr.tiwari2304/' target='_blank' rel='noreferrer' className='hover:text-primary transition'>Instagram</a></li>
                    </ul>
                </div>

            </div>
        </div>
        
        {/* Copyright Bar */}
        <div className='py-6 border-t border-gray-200 text-center text-sm text-gray-400'>
            <p>Copyright 2025 © OpenVoice - All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer
