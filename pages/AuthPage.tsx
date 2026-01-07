
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { authUser } from '../redux/authCreator';
import { RootState } from '../types';

const AuthPage: React.FC = () => {
    const dispatch = useDispatch();
    const error = useSelector((state: RootState) => state.error);
    const [mode, setMode] = useState<'login' | 'sign-up'>('login');

    const toggleMode = () => setMode(prev => prev === 'login' ? 'sign-up' : 'login');

    return (
        <div className="max-w-md mx-auto py-10">
            <div className="text-center mb-10">
                <div className="w-16 h-16 bg-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-200">
                    <i className="fas fa-user text-white text-3xl"></i>
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                    {mode === 'login' ? 'Welcome Back!' : 'Join the Club'}
                </h2>
                <p className="text-slate-500 mt-2 font-medium">
                    {mode === 'login' ? 'Your burger cravings missed you.' : 'Experience the best custom burgers in town.'}
                </p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-xl flex items-center animate-in shake-in duration-500">
                    <i className="fas fa-exclamation-triangle mr-3"></i>
                    <p className="text-sm font-bold uppercase tracking-wide">{error.replace(/_/g, ' ')}</p>
                </div>
            )}

            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100 relative">
                <Formik
                    initialValues={{ email: '', password: '', passwordConfirm: '' }}
                    validate={(values) => {
                        const errors: any = {};
                        if (!values.email) errors.email = 'Email required';
                        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = 'Invalid email';
                        
                        if (!values.password) errors.password = 'Password required';
                        else if (values.password.length < 6) errors.password = 'Must be 6+ chars';

                        if (mode === 'sign-up') {
                            if (!values.passwordConfirm) errors.passwordConfirm = 'Confirmation required';
                            else if (values.password !== values.passwordConfirm) errors.passwordConfirm = 'Passwords must match';
                        }
                        return errors;
                    }}
                    onSubmit={(values) => {
                        dispatch(authUser(values.email, values.password, mode) as any);
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Email Address</label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full px-5 py-3 rounded-2xl border-2 transition-all outline-none focus:ring-4 focus:ring-orange-100 ${errors.email && touched.email ? 'border-red-300 focus:border-red-400' : 'border-slate-50 bg-slate-50 focus:bg-white focus:border-orange-500'}`}
                                />
                                {errors.email && touched.email && <span className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wider">{errors.email}</span>}
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full px-5 py-3 rounded-2xl border-2 transition-all outline-none focus:ring-4 focus:ring-orange-100 ${errors.password && touched.password ? 'border-red-300 focus:border-red-400' : 'border-slate-50 bg-slate-50 focus:bg-white focus:border-orange-500'}`}
                                />
                                {errors.password && touched.password && <span className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wider">{errors.password}</span>}
                            </div>

                            {mode === 'sign-up' && (
                                <div className="animate-in slide-in-from-top-2 duration-300">
                                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Confirm Password</label>
                                    <input
                                        name="passwordConfirm"
                                        type="password"
                                        placeholder="••••••••"
                                        value={values.passwordConfirm}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`w-full px-5 py-3 rounded-2xl border-2 transition-all outline-none focus:ring-4 focus:ring-orange-100 ${errors.passwordConfirm && touched.passwordConfirm ? 'border-red-300 focus:border-red-400' : 'border-slate-50 bg-slate-50 focus:bg-white focus:border-orange-500'}`}
                                    />
                                    {errors.passwordConfirm && touched.passwordConfirm && <span className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wider">{errors.passwordConfirm}</span>}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold text-lg hover:bg-orange-600 shadow-lg shadow-orange-100 transition-all transform active:scale-95 flex items-center justify-center"
                            >
                                {isSubmitting ? <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : (mode === 'login' ? 'Login' : 'Create Account')}
                            </button>
                        </form>
                    )}
                </Formik>
            </div>

            <div className="mt-8 text-center">
                <button 
                    onClick={toggleMode}
                    className="text-slate-500 font-semibold text-sm hover:text-orange-500 transition-colors"
                >
                    {mode === 'login' ? "Don't have an account? Sign up here" : "Already a member? Sign in here"}
                </button>
            </div>
        </div>
    );
};

export default AuthPage;
