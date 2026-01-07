
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import axios from 'axios';
import { RootState } from '../types';

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const { ingredient, totalPrice, userId, token } = useSelector((state: RootState) => state);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (totalPrice <= 40) {
        return <div className="text-center py-20">
            <i className="fas fa-shopping-cart text-5xl text-slate-200 mb-4 block"></i>
            <h2 className="text-2xl font-bold text-slate-800">Your Cart is Empty</h2>
            <button onClick={() => navigate('/')} className="mt-6 text-orange-500 font-bold hover:underline">Start Building a Burger</button>
        </div>;
    }

    return (
        <div className="max-w-2xl mx-auto">
            <header className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-3">Complete Your Order</h2>
                <div className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full font-bold">
                    Order Total: {totalPrice.toFixed(0)} BDT
                </div>
            </header>

            {status && (
                <div className={`mb-8 p-4 rounded-2xl flex items-center animate-in slide-in-from-top-4 duration-300 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    <i className={`fas fa-${status.type === 'success' ? 'check-circle' : 'exclamation-circle'} mr-3 text-xl`}></i>
                    <p className="font-medium">{status.message}</p>
                </div>
            )}

            <Formik
                initialValues={{ deliveryAddress: '', phone: '', paymentType: 'Cash on Delivery' }}
                validate={(values) => {
                    const errors: any = {};
                    if (!values.deliveryAddress) errors.deliveryAddress = 'Delivery address is required';
                    if (!values.phone) errors.phone = 'Phone number is required';
                    if (values.phone && !/^\d{10,15}$/.test(values.phone)) errors.phone = 'Invalid phone number format';
                    return errors;
                }}
                onSubmit={(values) => {
                    setIsSubmitting(true);
                    const order = {
                        customer: values,
                        ingredients: ingredient,
                        price: totalPrice,
                        date: new Date().toISOString(),
                        userId: userId,
                    };

                    axios.post(`https://burger-builder-e7811-default-rtdb.firebaseio.com/order.json?auth=${token}`, order)
                        .then(() => {
                            setStatus({ type: 'success', message: 'Order placed successfully! Redirecting...' });
                            setTimeout(() => navigate('/orders'), 2000);
                        })
                        .catch(() => {
                            setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
                            setIsSubmitting(false);
                        });
                }}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100 space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Delivery Address</label>
                            <textarea
                                name="deliveryAddress"
                                value={values.deliveryAddress}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                rows={3}
                                placeholder="Street, City, Zip Code"
                                className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none focus:ring-4 focus:ring-orange-100 ${errors.deliveryAddress && touched.deliveryAddress ? 'border-red-300 focus:border-red-400' : 'border-slate-100 focus:border-orange-500 bg-slate-50 focus:bg-white'}`}
                            ></textarea>
                            {errors.deliveryAddress && touched.deliveryAddress && <span className="text-xs text-red-500 font-bold mt-1 inline-block">{errors.deliveryAddress}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><i className="fas fa-phone"></i></span>
                                <input
                                    name="phone"
                                    type="text"
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter contact number"
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all outline-none focus:ring-4 focus:ring-orange-100 ${errors.phone && touched.phone ? 'border-red-300 focus:border-red-400' : 'border-slate-100 focus:border-orange-500 bg-slate-50 focus:bg-white'}`}
                                />
                            </div>
                            {errors.phone && touched.phone && <span className="text-xs text-red-500 font-bold mt-1 inline-block">{errors.phone}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Payment Method</label>
                            <select
                                name="paymentType"
                                value={values.paymentType}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 bg-slate-50 outline-none focus:border-orange-500 focus:bg-white transition-all appearance-none cursor-pointer"
                            >
                                <option value="Cash on Delivery">Cash on Delivery</option>
                                <option value="Bkash">Bkash</option>
                                <option value="Card">Credit / Debit Card</option>
                            </select>
                        </div>

                        <div className="pt-6 grid grid-cols-2 gap-4">
                             <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="py-4 text-slate-600 font-bold hover:bg-slate-50 rounded-2xl transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="py-4 bg-orange-500 text-white rounded-2xl font-bold text-lg hover:bg-orange-600 disabled:opacity-50 shadow-lg shadow-orange-100 transition-all flex items-center justify-center"
                            >
                                {isSubmitting ? <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : 'Place Order'}
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default CheckoutPage;
