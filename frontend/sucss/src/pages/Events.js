import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Copyright from "../components/Copyright";

import convertDateToAcademicYear from '../functions/convertDateToAcademicYear';

function determineSemester(date) {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;

    if (month >= 9 || month <= 5) {
        return month >= 9 ? `Semester 1 - ${year}/${year + 1}` : `Semester 2 - ${year - 1}/${year}`;
    }
    return `Summer - ${year}`;
}

function sortSemesters(a, b) {
    const extract = str => {
        const parts = str.split(' - ')[1].split('/');
        return {
            year: parseInt(parts[0], 10),
            semester: parseInt(str.split(' ')[1], 10)
        };
    };

    const semesterA = extract(a);
    const semesterB = extract(b);

    if (semesterA.year !== semesterB.year) {
        return semesterB.year - semesterA.year;
    }
    return semesterB.semester - semesterA.semester;
}


function Events() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('/api/events', { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                const now = new Date();
                const sortedEvents = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                const categorizedEvents = { Upcoming: {}, Past: {} };

                sortedEvents.forEach(event => {
                    const eventDate = new Date(event.date);
                    const semester = determineSemester(event.date);
                    const category = eventDate > now ? 'Upcoming' : 'Past';

                    if (!categorizedEvents[category][semester]) {
                        categorizedEvents[category][semester] = [];
                    }
                    categorizedEvents[category][semester].push(event);
                });

                setEvents(categorizedEvents);
            })
            .catch(error => console.error(error));
    }, []);


    return (
        <div className='bg-black min-h-screen text-white 2xl:px-[32rem] px-12 py-24'>
            <p className='text-5xl font-bold pb-6'>Events</p>
            <p className='text-xl py-3'>
                All events are either for <b>beginners</b> or for more <b>advanced</b> members. We encourage you to come to all sessions regardless of your skill level.
            </p>
            <p className='text-xl py-3'>
                We store all our flags in our flag tracker at <a href='flags.sucss.org' className='underline'>flags.sucss.org</a>.
            </p>
            {['Upcoming', 'Past'].map(category => (
                <div key={category}>
                    <p className='text-2xl font-bold pt-8 pb-3'>{`${category} Events`}</p>
                    <hr />
                    {events[category] && Object.entries(events[category]).sort((a, b) => sortSemesters(a[0], b[0])).map(([semester, eventsInSemester]) => (
                        <div key={semester}>
                            <p className='text-xl font-bold pt-2'>{semester}</p>
                            <div className='py-4'>
                                {eventsInSemester.map(event => (
                                    <div key={event.id} className='py-1'>
                                        <p className='text-lg'>{event.isLink ? (
                                            <Link to={`/events/${convertDateToAcademicYear(event.date)}/${event.path}`} className='underline'>
                                                {event.date} - {event.name}
                                            </Link>
                                        ) : (
                                            `${event.date} - ${event.name}`
                                        )}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ))}

            <div className='text-center text-gray-300'>
                <Copyright />
            </div>
        </div>


    );

}

export default Events;