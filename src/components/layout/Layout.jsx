import React from 'react';
import Header from './Header';
import Footer from './Footer';
import webBg from '../../assets/myBG1.gif';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen relative flex flex-col font-sans text-neutral-900 dark:text-white">
            {/* global background */}
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `url(${webBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Overlay for readability - standardizing strictly on the requested dark theme + simple light mode handling */}
                <div className="absolute inset-0 bg-white/90 dark:bg-[#232222]/90" />
            </div>

            {/* Content Wrapper - ensures content sits above background */}
            <div className="relative z-10 flex flex-col flex-grow">
                <Header />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
