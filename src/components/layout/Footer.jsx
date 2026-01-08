import React from 'react';

const Footer = () => {
    return (
        <footer className="border-t border-gray-100 dark:border-dark-border bg-white dark:bg-dark-bg py-12">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                    <p className="text-sm text-slate-500 dark:text-neutral-400">
                        © {new Date().getFullYear()} Johnrey Mansilungan. All rights reserved.
                    </p>
                </div>

                <div className="flex gap-6">
                    <a
                        href="mailto:mansilungan.johnrey.dll@gmail.com"
                        target="_blank"
                        className="text-sm text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        Email
                    </a>
                    <a
                        href="https://www.instagram.com/rye.drp/"
                        target="_blank"
                        className="text-sm text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        Instagram
                    </a>
                    <a
                        href="https://www.youtube.com/@ryevisualsyt"
                        target="_blank"
                        className="text-sm text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        YouTube
                    </a>
                    <a
                        href="https://www.facebook.com/whoscutt1ngonions"
                        target="_blank"
                        className="text-sm text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        Facebook
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
