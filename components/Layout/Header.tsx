
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../types';

const Header: React.FC = () => {
    const { token, email } = useSelector((state: RootState) => state);

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm backdrop-blur-md bg-white/90">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2 group">
                    <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                        <i className="fas fa-hamburger text-white text-xl"></i>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-800 hidden sm:block">
                        Burger<span className="text-orange-500 font-extrabold">Builder</span>
                    </span>
                </Link>

                <div className="flex items-center space-x-1 sm:space-x-4">
                    {token ? (
                        <>
                            <div className="hidden md:flex items-center px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600 border border-slate-200">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                                {email}
                            </div>
                            <NavLink 
                                to="/" 
                                className={({ isActive }) => `px-4 py-2 rounded-lg text-sm font-semibold transition-all ${isActive ? 'bg-orange-500 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                <i className="fas fa-plus mr-2 hidden lg:inline"></i>Build
                            </NavLink>
                            <NavLink 
                                to="/orders" 
                                className={({ isActive }) => `px-4 py-2 rounded-lg text-sm font-semibold transition-all ${isActive ? 'bg-orange-500 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                <i className="fas fa-history mr-2 hidden lg:inline"></i>Orders
                            </NavLink>
                            <NavLink 
                                to="/logout" 
                                className="px-4 py-2 rounded-lg text-sm font-semibold text-red-500 hover:bg-red-50 transition-all"
                            >
                                <i className="fas fa-sign-out-alt"></i>
                            </NavLink>
                        </>
                    ) : (
                        <NavLink 
                            to="/login" 
                            className="px-6 py-2 bg-orange-500 text-white rounded-lg text-sm font-bold hover:bg-orange-600 transition-all shadow-md shadow-orange-200"
                        >
                            Get Started
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
