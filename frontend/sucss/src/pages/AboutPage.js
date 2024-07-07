import React from 'react';

import '../custom-styles.css';

import Copyright from '../components/Copyright';

function AboutPage() {
    return (
        <div className='bg-black min-h-screen text-white 2xl:px-[32rem] p-12 custom-section'>
            <h1>About the Society</h1>
            <p>The Southampton University Cyber Security Society (SUCSS) is a group of students interested in the various aspects of cyber security.</p>
            <p>We host sessions on various topics, some with external speakers, and provide lots of practical opportunities to put what you've learned into practice at CTF competitions and workshops.</p>
            <p>Our weekly sessions are held every Wednesday at 6pm in 67/1037.</p>
            <p>We are proudly sponsored by <a href="/about/with-secure/">WithSecure™</a>.</p>
            <h2>Committee</h2>
            <p>The committee work tirelessly on your behalf to bring you cyber security events and talks.</p>
            <p>Here is our current committee:</p>
            <ul>
                <li><strong>President</strong>: Skyler Mansfield</li>
                <li><strong>Vice President</strong>: Matthew Grove</li>
                <li><strong>Vice President</strong>: Samuel Kitson</li>
                <li><strong>Treasurer</strong>: William Pearman</li>
                <li><strong>Webmaster</strong>: Jacob Racklyeft</li>
                <li><strong>Technical Officer</strong>: Albert Ratuszniak</li>
                <li><strong>Events Officer</strong>: Nathaniel Smith</li>
                <li><strong>Secretary</strong>: Matthew Botten</li>
            </ul>
            <p>Previous committees can be located <a href="/docs/previous-committees/">here</a>.</p>
            <h2>Contact Us</h2>
            <p>You can contact us by email at <a href="mailto:sucss@soton.ac.uk">sucss@soton.ac.uk</a>. You can also reach us by messaging our <a href="https://www.facebook.com/sotoncyber/">Facebook page</a> or joining our <a href="https://discord.com/invite/YC4H9XVkdc">Discord server</a>.</p>
            <h2>Other Items</h2>
            <p>We have signed and fully support the CASHES (Consent Awareness and Sexual Health Education Society) pledge, which can be found <a href="https://www.instagram.com/p/CMfmmqNAq8H/">here</a>.</p>
            <p>The constitution for the society can be found <a href="https://raw.githubusercontent.com/sotoncyber/core/master/constitution/constitution.pdf">here</a>.</p>

            <Copyright />
        </div>
    )
}

export default AboutPage;