import React from 'react';

import '../custom-styles.css';

import Copyright from '../components/Copyright';

function Docs() {
    return (
        <div className='bg-black min-h-screen text-white 2xl:px-[32rem] p-12 custom-section'>
            <h1>Docs</h1>
            <p>If you have a suggestion for a guide we should add to this page, let a committee member know on Discord!</p>

            <div className='space-y-3 text-lg'>
            <div>
                <a href="/docs/useful-links/">Useful Links</a>
            </div>
            <div>
                <a href="/docs/hardware-electronics/">Beginner Electronics for Hardware Hacking</a>
            </div>
            <div>
                <a href="/docs/burp-suite/">Burp Suite</a>
            </div>
            <div>
                <a href="/docs/cracking-wep/">Cracking WEP</a>
            </div>
            <div>
                <a href="/docs/cracking-wpa2/">Cracking WPA2</a>
            </div>
            <div>
                <a href="/docs/dns/">DNS</a>
            </div>
            <div>
                <a href="/docs/pgp/">PGP</a>
            </div>
            <div>
                <a href="/docs/previous-committees/">Previous Committees</a>
            </div>
            <div>
                <a href="/docs/reverse-shells/">Reverse Shells</a>
            </div>
            <div>
                <a href="/docs/sql/">SQL</a>
            </div>
            <div>
                <a href="/docs/ssh/">SSH</a>
            </div>
            <div>
                <a href="/docs/kali-vm/">Setting Up a Kali VM</a>
            </div>
            <div>
                <a href="/docs/wifi/">WiFi</a>
            </div>
            </div>

            <Copyright />
        </div>
    )
}

export default Docs;