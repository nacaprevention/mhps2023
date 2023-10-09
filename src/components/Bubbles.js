import React, { useState } from 'react';
import '../styles/Bubbles.css';

const Bubbles = () => {
    const [isInfoVisible, setInfoVisible] = useState(false);

    const toggleInfo = () => {
        setInfoVisible(!isInfoVisible);
    };

    return (
        <div className="bubble-container">
            <div className="bubble" onClick={toggleInfo}>Click me!</div>
            {isInfoVisible && <div className="info">This is the information you wanted to see.</div>}
        </div>
    );
};

export default Bubbles;
