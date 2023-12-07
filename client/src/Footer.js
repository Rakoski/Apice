import './Footer.css'
import React, { useState, useEffect } from 'react';

function Footer() {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => {
            clearInterval(interval); // Cleanup interval on unmount
        };
    }, []);

    const formattedDateTime = dateTime.toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });

    return (
        <footer>
            <div className="footer-text">Paranavaí</div>
            <div className="footer-date-time">{formattedDateTime}</div>
        </footer>
    );
}

export default Footer;
