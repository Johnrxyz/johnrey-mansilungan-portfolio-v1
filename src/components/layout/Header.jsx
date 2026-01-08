import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Videos', path: '/videos' },
        { name: 'Websites', path: '/websites' },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleContactClick = () => {
        setIsMenuOpen(false);
        if (location.pathname === '/') {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/', { state: { scrollTo: 'contact' } });
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 dark:border-slate-800 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link
                    to="/"
                    className="text-xl font-bold tracking-tight text-slate-900 dark:text-white"
                >
                    RYE
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors hover:text-slate-900 dark:hover:text-white ${isActive
                                    ? 'text-slate-900 dark:text-white'
                                    : 'text-slate-500 dark:text-slate-400'
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                    <button
                        onClick={handleContactClick}
                        className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        Contact
                    </button>
                    <div className="pl-4 border-l border-gray-200 dark:border-slate-800">
                        <ThemeToggle />
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden items-center gap-4">
                    <ThemeToggle />
                    <button
                        onClick={toggleMenu}
                        className="p-2 text-slate-900 dark:text-white"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-dark-bg border-b border-gray-100 dark:border-slate-800 p-4 shadow-lg">
                    <nav className="flex flex-col gap-4">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `text-lg font-medium transition-colors ${isActive
                                        ? 'text-slate-900 dark:text-white'
                                        : 'text-slate-500 dark:text-neutral-400'
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                        <button
                            onClick={handleContactClick}
                            className="text-lg font-medium text-left text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            Contact
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
