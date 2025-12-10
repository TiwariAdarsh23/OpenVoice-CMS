import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
    const { navigate, token } = useAppContext();
    const { user } = useUser();

    return (
        <div className='flex justify-between items-center py-5 mx-8 sm:mx-0 xl:mx-32'>
            <img onClick={() => navigate('/')} src={assets.logo} alt="logo" className='w-50 sm:w-52 cursor-pointer' />
            
            <div className='flex items-center gap-4'>
                {/* 1. If Admin (Custom Token), show Dashboard */}
                {token && (
                    <button onClick={() => navigate('/admin')} className='bg-primary text-white px-6 py-2 rounded-full text-sm cursor-pointer'>
                        Admin Panel
                    </button>
                )}

                {/* 2. If Clerk User is Signed In, show Write Blog & Profile */}
                <SignedIn>
                    <button 
                        onClick={() => navigate('/create-post')} 
                        className='hidden sm:flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full text-sm hover:bg-gray-50 transition cursor-pointer'>
                        <img src={assets.add_icon} className='w-4' alt="write" />
                        Publish
                    </button>
                        <UserButton/>
                </SignedIn>

                {/* 3. If Guest, show Sign In */}
                <SignedOut>
                    <SignInButton mode="modal">
                        <button className='flex item-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-8 py-2.5'>
                            Get Started
                            <img src={assets.arrow} className='w-3' alt="arrow" />
                        </button>
                    </SignInButton>
                </SignedOut>
            </div>
        </div>
    )
}

export default Navbar