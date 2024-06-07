import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Copyright from "../components/Copyright";

import convertDateToAcademicYear from '../functions/convertDateToAcademicYear';

function Events() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('/api/events', { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setEvents(data);
            })
            .catch(error => console.error(error));
    }, [])

    return (
        <div className='bg-black min-h-screen text-white px-[32rem] py-24'>
            <p className='text-5xl font-bold pb-6'>Events</p>
            <p className='text-xl py-3'>
                All events are either for <b>beginners</b> or for more <b>advanced</b> members. We encourage you to come to all sessions regardless of your skill level.
            </p>
            <p className='text-xl py-3'>
                We store all our flags in our flag tracker at <a href='flags.sucss.org' className='underline'>flags.sucss.org</a>.
            </p>
            <p className='text-2xl font-bold py-3'>Upcoming events</p>
            <hr />

            <div className='py-4'>
                {events.map(event => (
                    new Date(event.date) > new Date() ? (
                        <div key={event.id} className='bg-gray-800 p-4'>
                            <p className='text-xl font-bold'>{event.title}</p>
                            <p className='text-lg'>{event.description}</p>
                        </div>
                    ) : null
                ))}
            </div>

            <p className='text-2xl font-bold py-3'>Past events</p>
            <hr />

            <div className='py-4'>
                {events.map(event => (
                    new Date(event.date) <= new Date() ? (
                        <div key={event.id} className='py-2'>
                            <p className='text-lg'>{event.isLink ? (
                                <Link to={`/events/${convertDateToAcademicYear(event.date)}/${event.path}`} className='underline'>
                                    {event.date} - {event.name}
                                </Link>
                            ) : (
                                event.date + "-" + event.name
                            )}
                            </p>
                        </div>
                    ) : null
                ))}
            </div>

            <div className='text-center text-gray-300'>
                <Copyright />
            </div>
        </div>
    );

}

export default Events;