import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as DiscordIcon } from '../svgs/discord.svg';
import { ReactComponent as FacebookIcon } from '../svgs/facebook.svg';
import { ReactComponent as GithubIcon } from '../svgs/github.svg';
import { ReactComponent as InstagramIcon } from '../svgs/instagram.svg';
import { ReactComponent as TwitterIcon } from '../svgs/twitter.svg';

function Navbar() {
    return (
        <nav className="bg-black text-white p-4 flex justify-between items-center border-b border-gray-700">
            <div className="flex content-between items-center">
                <Link to="/" className='flex content-between items-center'>
                    <img src="/sucss-logo.png" alt="SUCSS" className="w-8 h-8" />
                    <h1 className="font-bold text-3xl mx-5 text-[#5a67d8]">SUCSS</h1>
                </Link>
                <Link to="/about" className="text-white text-lg px-3 hover:text-gray-300">About</Link>
                <Link to="/events" className="text-white text-lg px-3 hover:text-gray-300">Events</Link>
                <Link to="/docs" className="text-white text-lg px-3 hover:text-gray-300">Docs</Link>
            </div>
            <div>
                <div className='flex content-center'>
                    <DiscordIcon className="w-8 h-8 mx-2 text-gray-500 stroke-current stroke-0" />
                    <FacebookIcon className="w-8 h-8 mx-2 text-gray-500 stroke-current" />
                    <GithubIcon className="w-8 h-8 mx-2 text-gray-500 stroke-current" />
                    <InstagramIcon className="w-8 h-8 mx-2 text-gray-500 stroke-current" />
                    <TwitterIcon className="w-8 h-8 mx-2 text-gray-500 fill-current" />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
