import React, { createContext, useContext, useState } from 'react';

const DesignContext = createContext();

export const DesignProvider = ({ children }) => {
    const [designVersion, setDesignVersion] = useState(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('designVersion')) {
            return localStorage.getItem('designVersion');
        }
        return 'v1';
    });

    const toggleDesign = () => {
        setDesignVersion((prev) => {
            const next = prev === 'v1' ? 'v2' : 'v1';
            localStorage.setItem('designVersion', next);
            return next;
        });
    };

    return (
        <DesignContext.Provider value={{ designVersion, toggleDesign }}>
            {children}
        </DesignContext.Provider>
    );
};

export const useDesign = () => useContext(DesignContext);
