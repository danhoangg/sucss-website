import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Copyright from '../components/Copyright';

import '../custom-styles.css';

function EventPage() {
    const { year, path } = useParams();
    const [htmlContent, setHtmlContent] = useState('Loading...');

    useEffect(() => {
        fetch(`/api/get-html/${year}/${path}`, { method: 'POST' })
            .then(response => {
                if (response.status !== 200) {
                    window.location.href = '/events';
                    return "Event not found. Redirecting...";
                }
                return response.text();
            })
            .then(data => setHtmlContent(data))
            .catch(error => console.error(error));
    }, [year, path]);

    return (
        <div className='bg-black min-h-screen text-white 2xl:px-[32rem] p-12 custom-section'>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            <Copyright />
        </div>
    );
}

export default EventPage;