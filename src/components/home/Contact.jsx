import React from 'react';
import Button from '../ui/Button';

const Contact = () => {
    return (
        <section id="contact" className="py-20 md:py-28 h-[calc(100vh-20rem)]">
            <div className="container mx-auto px-4 max-w-3xl text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                    Let's Work Together
                </h2>
                <p className="text-xl text-slate-600 dark:text-neutral-400 mb-10">
                    Open to freelance projects and collaborations.
                </p>

                <div className="inline-flex flex-col items-center gap-6">
                    <a
                        href="mailto:mansilungan.johnrey.dll@gmail.com"
                        className="text-lg sm:text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-all md:break-normal"
                    >
                        mansilungan.johnrey.dll@gmail.com
                    </a>

                    <div className="flex gap-4 mt-4">
                        {/* Optional links as requested */}
                        <a href="https://www.instagram.com/rye.drp/" target="_blank" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Instagram</a>
                        <span className="text-slate-300 dark:text-neutral-700">•</span>
                        <a href="https://www.facebook.com/whoscutt1ngonions" target="_blank" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Facebook</a>
                        {/* <a href="" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Upwork</a>
                        <span className="text-slate-300 dark:text-neutral-700">•</span>
                        <a href="" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">OnlineJobsPH</a> */}
                    </div>

                    <div className="mt-8">
                        <a href="mailto:mansilungan.johnrey.dll@gmail.com">
                            <Button variant="primary">Send me an Email</Button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
