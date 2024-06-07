import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Copyright from '../components/Copyright';

function EventPage() {
    const { year, path } = useParams();
    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        fetch(`/api/get-html/${year}/${path}`, { method: 'POST' })
            .then(response => response.text())
            .then(data => setHtmlContent(data))
            .catch(error => console.error(error));
    }, [year, path]);

    return (
        <div className='bg-black min-h-screen text-white xl:px-[32rem] py-24 px-12'>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            <div className='text-center'>
                <Copyright />
            </div>
        </div>
    );
}

export default EventPage;