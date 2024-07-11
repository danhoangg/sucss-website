import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { FaArrowLeft } from 'react-icons/fa';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-okaidia.css';

import '../custom-styles.css';

import Copyright from '../components/Copyright';

const template = `<main>
 <section>
  <h1>
   Title
  </h1>
  <p>
   <strong>
    Date
   </strong>
   : ?
  </p>
  <p>
   <strong>
    Difficulty
   </strong>
   : ?
  </p>
  <p>
   <strong>
    Delivered By
   </strong>
   : ?
  </p>
  <h2>
   Overview
  </h2>
  <p>
    Description
  </p>
 </section>
</main>
`;

function EditPage() {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [path, setPath] = useState('');
    const [isLink, setIsLink] = useState(false);
    const [disabledButton, setDisabledButton] = useState(true);
    const [code, setCode] = useState(template);
    const { event_id } = useParams();

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (name && date) {
            if (isLink && (!code || !path)) {
                setDisabledButton(true);
            } else {
                setDisabledButton(false);
            }
        } else {
            setDisabledButton(true);
        }
    }, [name, date, path, isLink, code])

    useEffect(() => {
        if (event_id === 'new') {
            return;
        }
        fetch(`/api/get-event/${event_id}`, { method: 'POST' })
            .then((response) => response.json())
            .then((data) => {
                setName(data.name);
                setDate(data.date);
                setPath(data.path);
                setIsLink(data.isLink);
                setCode(data.code);
            })
            .then(() => {
                if (!isLink) {
                    setCode(template);
                }
            })
            .catch((error) => {
                console.error('Fetch event failed', error);
            });
    }, [event_id, isLink])

    const handleEdit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        fetch(`/api/edit-event`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: event_id,
                name: name,
                date: date,
                path: path,
                isLink: isLink,
                code: code
            })
        })
            .then((res) => {
                if (res.status !== 200) {
                    setSuccess(false);
                    res.json().then(data => setErrorMessage(data.error));
                    setShowError(true);
                    setTimeout(() => {
                        setShowError(false);
                    }, 3000);
                } else {
                    setSuccess(true);
                    setErrorMessage('Edit Successful');
                    setShowError(true);
                    setTimeout(() => {
                        setShowError(false);
                    }, 3000);
                }
            })
            .catch((error) => {
                setShowError(true);
                setTimeout(() => {
                    setShowError(false);
                }, 3000);
            });
    }

    const handleNew = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        fetch(`/api/add-event`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: event_id,
                name: name,
                date: date,
                path: path,
                isLink: isLink,
                code: code
            })
        })
        .then((res) => {
            if (res.status !== 201) {
                setSuccess(false);
                res.json().then(data => setErrorMessage(data.error));
                setShowError(true);
                setTimeout(() => {
                    setShowError(false);
                }, 3000);
            } else {
                navigate('/admin');
            }
        })
    }

    return (
        <div className='min-h-screen p-12 py-8 text-white bg-black'>
            <div className="flex items-center mx-4 mb-4 space-x-2 text-sucss-purple hover:text-blue-800">
                <FaArrowLeft />
                <Link to="/admin" className="text-lg">Go back to admin</Link>
            </div>

            <div className='grid grid-cols-2 space-x-4'>
                <form className='mx-4 space-y-8' onSubmit={event_id === "new" ? handleNew : handleEdit}>
                    <div className='flex items-center justify-between'>
                        <div className='w-3/4'>
                            <input
                                className='w-full p-2 bg-black border text-md rounded-xl border-border-color focus:border-sucss-purple focus:outline-none focus:ring-sucss-purple'
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                            />
                        </div>
                        <div className='flex items-center'>
                            <input
                                className='w-10 h-10 mr-2 bg-black border checked:bg-sucss-purple focus:checked:bg-sucss-purple focus:ring-offset-dark-sucss-purple border-border-color rounded-xl focus:outline-none focus:border-sucss-purple focus:ring-dark-sucss-purple'
                                type="checkbox"
                                checked={isLink}
                                onChange={(e) => setIsLink(e.target.checked)}
                            />
                            <label htmlFor="isLink" className='text-gray-400'>Is Link</label>
                        </div>
                    </div>
                    {isLink && (
                        <div className='w-full'>
                            <Editor
                                value={code}
                                onValueChange={(code) => setCode(code)}
                                highlight={(code) => highlight(code, languages.markup, 'markup')}
                                padding={10}
                                placeholder='Enter HTML here...'
                                style={{
                                    fontFamily: '"Fira code", "Fira Mono", monospace',
                                    fontSize: 14,
                                    backgroundColor: '#2d2d2d',
                                    color: '#f8f8f2',
                                    borderRadius: '5px',
                                    width: '100%',
                                    minHeight: '400px',
                                }}
                                className="border border-gray-700"
                            />
                        </div>
                    )}

                    <div className='flex space-x-8 space-between'>
                        <input
                            className='w-full p-2 bg-black border text-md rounded-xl border-border-color focus:border-sucss-purple focus:outline-none focus:ring-sucss-purple'
                            type="text"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            placeholder="Date"
                        />
                        {isLink && (
                            <input
                                className='w-full p-2 bg-black border text-md rounded-xl border-border-color focus:border-sucss-purple focus:outline-none focus:ring-sucss-purple'
                                type="text"
                                value={path}
                                onChange={(e) => setPath(e.target.value)}
                                placeholder="Path"
                            />
                        )}
                    </div>

                    <button disabled={disabledButton} type="submit" className='p-2 px-10 text-lg transition ease-in-out rounded-full focus:outline-none bg-gradient-to-br enabled:focus:-translate-y-1 enabled:hover:-translate-y-1 disabled:from-gray-600 disabled:to-gray-800 from-sucss-purple to-dark-sucss-purple enabled:focus:shadow-lg enabled:focus:shadow-gray-900 enabled:hover:shadow-lg enabled:hover:shadow-gray-900'>
                        Submit
                    </button>
                </form>
                <div className='px-4 custom-section'>
                    {isLink && (
                        <div dangerouslySetInnerHTML={{ __html: code }}>

                        </div>
                    )}
                </div>
            </div>

            <div className={`fixed top-20 right-4 max-w-xs p-4 text-xl ${success ? 'bg-green-500' : 'bg-red-600'} text-white rounded-lg shadow-lg transition-transform transform ${showError ? '-translate-x-0' : 'translate-x-[150%]'}`}>
                {errorMessage ? errorMessage : 'Error Occurred'}
            </div>

            <Copyright />
        </div>
    )
}

export default EditPage;