import React from 'react';

import '../custom-styles.css';
import { SlArrowRightCircle } from "react-icons/sl";

import Copyright from '../components/Copyright';

function HomePage() {
    return (
        <div className='items-center min-h-screen p-12 text-center text-white bg-black'>
            <img src='/images/sucss-logo.png' alt='SUCSS Logo' className='w-64 mx-auto' />
            <h1 className='text-6xl font-extrabold text-center'>SUCSS</h1>
            <h2 className='py-8 text-3xl font-bold'>Southampton University Cyber Security Society</h2>
            <p className='text-xl'>
                We run weekly sessions on many areas of cyber security, including hardware hacking, web app exploitation and more. Joining the society opens up many exciting opportunities, from coming along to our socials, to joining a team to compete in CTF competitions. Join us every Wednesday at 6pm in Building 67 (Nightingale) Room 1037 for our weekly sessions!
            </p>

            <div className='items-center justify-center w-full py-8 sm:flex'>
                <a href='/events' className='flex items-center px-6 py-4 mx-2 my-4 transition duration-300 ease-in-out shadow-lg bg-sucss-purple rounded-xl shadow-white/15 hover:shadow-white/40'>
                    <h2 className='pr-4 text-2xl font-bold'>View upcoming events</h2>
                    <SlArrowRightCircle className='text-2xl' />
                </a>
                <a href='https://discord.com/invite/YC4H9XVkdc' className='flex items-center px-6 py-4 mx-2 my-4 transition duration-300 ease-in-out shadow-lg bg-sucss-purple rounded-xl shadow-white/15 hover:shadow-white/40'>
                    <h2 className='pr-4 text-2xl font-bold'>Join our discord server</h2>
                    <SlArrowRightCircle className='text-2xl' />
                </a>
            </div>

            <div className='items-center justify-around sm:flex'>
                <div className='my-6'>
                    <a href='/about' className='px-6 py-2 text-lg font-bold transition duration-300 border border-gray-600 rounded-xl text-sucss-purple hover:bg-sucss-purple hover:text-black hover:shadow-md hover:shadow-sucss-purple/40'>
                        About Us
                    </a>
                </div>
                <div className='my-6'>
                    <a href='https://www.susu.org/groups/cyber-security-society' className='px-6 py-2 text-lg font-bold transition duration-300 border border-gray-600 rounded-xl text-sucss-purple hover:bg-sucss-purple hover:text-black hover:shadow-md hover:shadow-sucss-purple/40'>
                        Sign up via SUSU
                    </a>
                </div>
                <div className='my-6'>
                    <a href='https://flags.sucss.org/' className='px-6 py-2 text-lg font-bold transition duration-300 border border-gray-600 rounded-xl text-sucss-purple hover:bg-sucss-purple hover:text-black hover:shadow-md hover:shadow-sucss-purple/40'>
                        Flag Tracker
                    </a>
                </div>
            </div>

            <h3 className='pt-12 pb-10 text-2xl font-bold'>
                Sponsored By
            </h3>
            <a className='flex justify-center'>
                <img className='w-64' alt='with secure logo' src='/images/with-secure-white.png' />
            </a>

            <Copyright />
        </div>
    )
}

export default HomePage;