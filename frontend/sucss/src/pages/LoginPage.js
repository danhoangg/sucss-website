import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import Copyright from '../components/Copyright';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [disabledButton, setDisabledButton] = useState(true);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password)
            .then(() => {
                navigate('/admin');
            })
            .catch((error) => {
                setShowError(true);
                setTimeout(() => {
                    setShowError(false);
                }, 3000);
            });
    };

    useEffect(() => {
        if (username && password) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        }
    }, [username, password]);

    return (
        <div className='bg-black min-h-screen text-white 2xl:px-[32rem] p-12'>
            <p className='mb-8 text-center text-7xl'>Log In</p>
            <p className='mb-8 text-xl text-center opacity-75'>To create, edit and delete events</p>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center space-y-8 sm:px-32'>
                <div>
                    <input
                        className='w-full p-4 mb-4 text-xl bg-black border rounded-xl border-border-color focus:border-sucss-purple focus:outline-none'
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                </div>
                <div>
                    <input
                        className='w-full p-4 mb-4 text-xl bg-black border rounded-xl border-border-color focus:border-sucss-purple focus:outline-none'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
                <button disabled={disabledButton} type="submit" className='p-3 text-2xl transition ease-in-out bg-gradient-to-br enabled:hover:-translate-y-1 disabled:from-gray-600 disabled:to-gray-800 from-sucss-purple to-dark-sucss-purple rounded-xl enabled:hover:shadow-lg enabled:hover:shadow-gray-900'>
                    Sign In
                </button>
            </form>

            <div className={`fixed top-20 right-4 max-w-xs p-4 text-xl bg-red-600 text-white rounded-lg shadow-lg transition-transform transform ${showError ? '-translate-x-0' : 'translate-x-[150%]'}`}>
                Login Failed
            </div>


            <div className='py-40'>
                <Copyright />
            </div>
        </div>
    );
};

export default LoginPage;
