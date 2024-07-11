import React, { useEffect, useState, useCallback } from 'react';

import '../custom-styles.css';

import Copyright from '../components/Copyright';
import { FaSearch } from "react-icons/fa";

import Table from '../components/Table';

function AdminPage() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleDelete = useCallback((id) => {
        const token = localStorage.getItem('token');
        fetch('/api/delete-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id })
        })
            .then((response) => {
                if (response.status === 200) {
                    setData(prevData => prevData.filter(event => event.id !== id));
                    setSuccess(true);
                    setErrorMessage("Event deleted successfully");
                    setShowError(true);
                    setTimeout(() => {
                        setShowError(false);
                    }, 3000);
                } else {
                    response.json().then(data => {
                        setSuccess(false);
                        setErrorMessage(data.error);
                        setShowError(true);
                        setTimeout(() => {
                            setShowError(false);
                        }, 3000);
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setSuccess(false);
                setErrorMessage("An error occurred");
                setShowError(true);
                setTimeout(() => {
                    setShowError(false);
                }, 3000);
            });
    }, []);

    useEffect(() => {
        fetch('/api/events', { method: 'POST' })
            .then((response) => response.json())
            .then((data) => {
                data = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                data = data.map((event) => ({
                    id: event.id,
                    name: event.name,
                    date: event.date,
                    actions: (
                        <div>
                            <a href={'/admin/' + event.id}>Edit</a>
                            {', '}
                            <span className='cursor-pointer' onClick={() => handleDelete(event.id)}>Delete</span>
                        </div>
                    )
                }));
                setData(data);
            });
    }, [handleDelete]);

    const columns = ['name', 'date', 'actions'];

    return (
        <div className='min-h-screen p-12 text-white bg-black 2xl:px-96'>
            <div className='flex items-center justify-between mb-7'>
                <p className='text-4xl'>Events</p>
                <div className='relative flex items-center'>
                    <FaSearch className='absolute text-gray-400 left-3' />
                    <input
                        className="w-full py-2 pl-10 pr-4 text-gray-400 rounded-xl bg-zinc-900 focus:outline-none focus:border-sucss-purple"
                        placeholder="Search"
                        type='text'
                        onChange={handleSearch}
                    >
                    </input>
                </div>
            </div>

            <Table data={data} columns={columns} rowsPerPage={7} search={search} setSearch={setSearch} className='my-32' />

            <div className={`fixed top-20 right-4 max-w-xs p-4 text-xl ${success ? 'bg-green-500' : 'bg-red-600'} text-white rounded-lg shadow-lg transition-transform transform ${showError ? '-translate-x-0' : 'translate-x-[150%]'}`}>
                {errorMessage ? errorMessage : 'Error Occurred'}
            </div>

            <div className='py-10'>
                <Copyright />
            </div>
        </div>
    )
}

export default AdminPage;