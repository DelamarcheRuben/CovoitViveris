import React, { createContext, useContext, useState, useEffect } from 'react';

const WindowWidthContext = createContext();

export const WindowWidthProvider = ({ children }) => {
    const [windowWidth, setWindowWidth] = useState(() => {
        const savedWidth = Number(window.localStorage.getItem('windowWidth'));
        return isNaN(savedWidth) ? window.innerWidth : savedWidth;
    });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setWindowWidth(width);
            window.localStorage.setItem('windowWidth', width.toString());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <WindowWidthContext.Provider value={windowWidth}>
            {children}
        </WindowWidthContext.Provider>
    );
};

export const useWindowWidth = () => {
    return useContext(WindowWidthContext);
};