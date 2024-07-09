import React, { useEffect, useState } from 'react';

import '../custom-styles.css';

import Copyright from '../components/Copyright';
import { FaSearch } from "react-icons/fa";

import Table from '../components/Table';

function AdminPage() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleDelete = (id) => {
        fetch('/api/delete-event', {method: 'POST', body: JSON.stringify({id: id})})
    }

    useEffect(() => {
        fetch('/api/events', {method: 'POST'})
            .then((response) => response.json())
            .then((data) => {
                data = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                data = data.map((event) => {
                    return {
                        name: event.name,
                        date: event.date,
                        actions: <div><a href={'/admin/' + event.id}>Edit, </a><span className='cursor-pointer' onClick={() => handleDelete(event.id)}>Delete</span></div>
                    }
                });
                setData(data);
            })
    }, [])

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

            <div className='py-10'>
                <Copyright />
            </div>
        </div>
    )
}

export default AdminPage;