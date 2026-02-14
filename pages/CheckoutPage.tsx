
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import axios from 'axios';
import { RootState } from '../types';

interface PaymentModalProps {
  type: 'Bkash' | 'Card';
  amount: number;
  onConfirm: (transactionId: string) => void;
  onCancel: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ type, amount, onConfirm, onCancel }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ number: '', otp: '', pin: '', cardNo: '', expiry: '', cvc: '' });

  const handleProcess = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < (type === 'Bkash' ? 3 : 2)) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(step + 1);
      }, 1500);
    } else {
      setLoading(true);
      setTimeout(() => {
        const txId = Math.random().toString(36).substring(2, 12).toUpperCase();
        onConfirm(txId);
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className={`p-6 text-center ${type === 'Bkash' ? 'bg-[#e2136e]' : 'bg-slate-800'} text-white relative`}>
          <button onClick={onCancel} className="absolute top-4 right-4 text-white/60 hover:text-white">
            <i className="fas fa-times"></i>
          </button>
          {type === 'Bkash' ? (
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black italic tracking-tighter mb-1">bKash</span>
              <p className="text-xs opacity-80 uppercase tracking-widest">Payment Gateway</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <i className="fas fa-credit-card text-2xl mb-2"></i>
              <p className="text-sm font-bold uppercase tracking-widest">Secure Card Payment</p>
            </div>
          )}
        </div>

        <form onSubmit={handleProcess} className="p-8">
          <div className="text-center mb-6">
            <span className="text-slate-400 text-xs font-bold uppercase block mb-1">Amount to Pay</span>
            <span className="text-3xl font-black text-slate-900">{amount.toFixed(0)} BDT</span>
          </div>

          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-slate-100 border-t-orange-500 rounded-full animate-spin"></div>
              <p className="text-slate-500 font-medium animate-pulse">Processing Transaction...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {type === 'Bkash' ? (
                <>
                  {step === 1 && (
                    <div className="animate-in slide-in-from-right-4 duration-300">
                      <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Your bKash Account Number</label>
                      <input 
                        required
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-[#e2136e] transition-all text-center text-xl tracking-widest font-bold"
                        value={formData.number}
                        onChange={(e) => setFormData({...formData, number: e.target.value})}
                      />
                    </div>
                  )}
                  {step === 2 && (
                    <div className="animate-in slide-in-from-right-4 duration-300">
                      <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Enter 6-digit OTP</label>
                      <input 
                        required
                        type="text"
                        placeholder="______"
                        maxLength={6}
                        className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-[#e2136e] transition-all text-center text-3xl tracking-[0.5em] font-black"
                        value={formData.otp}
                        onChange={(e) => setFormData({...formData, otp: e.target.value})}
                      />
                      <p className="text-center text-xs text-slate-400 mt-4">Resend OTP in 54s</p>
                    </div>
                  )}
                  {step === 3 && (
                    <div className="animate-in slide-in-from-right-4 duration-300">
                      <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Enter bKash PIN</label>
                      <input 
                        required
                        type="password"
                        placeholder="•••••"
                        maxLength={5}
                        className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-[#e2136e] transition-all text-center text-3xl tracking-[0.5em] font-black"
                        value={formData.pin}
                        onChange={(e) => setFormData({...formData, pin: e.target.value})}
                      />
                    </div>
                  )}
                </>
              ) : (
                <>
                  {step === 1 && (
                    <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Card Number</label>
                        <input 
                          required
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none focus:border-slate-800 transition-all font-mono"
                          value={formData.cardNo}
                          onChange={(e) => setFormData({...formData, cardNo: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Expiry Date</label>
                          <input 
                            required
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none focus:border-slate-800 transition-all text-center"
                            value={formData.expiry}
                            onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">CVC</label>
                          <input 
                            required
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none focus:border-slate-800 transition-all text-center"
                            value={formData.cvc}
                            onChange={(e) => setFormData({...formData, cvc: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="text-center py-6 animate-in zoom-in-90 duration-300">
                      <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-shield-alt text-2xl"></i>
                      </div>
                      <h4 className="font-bold text-slate-800">3D Secure Verification</h4>
                      <p className="text-sm text-slate-500 mt-1">Please confirm the charge from your bank app.</p>
                    </div>
                  )}
                </>
              )}

              <button
                type="submit"
                className={`w-full py-4 rounded-2xl text-white font-bold text-lg transition-all shadow-lg active:scale-95 ${type === 'Bkash' ? 'bg-[#e2136e] shadow-pink-100' : 'bg-slate-800 shadow-slate-100'}`}
              >
                {step === (type === 'Bkash' ? 3 : 2) ? 'Confirm Payment' : 'Next'}
              </button>
            </div>
          )}
        </form>

        <div className="px-8 pb-6 text-center">
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest flex items-center justify-center">
            <i className="fas fa-lock mr-2"></i> Secured by {type === 'Bkash' ? 'bKash Limited' : 'ProPay Gateway'}
          </p>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const { ingredient, totalPrice, userId, token } = useSelector((state: RootState) => state);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Payment specific states
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [pendingOrderData, setPendingOrderData] = useState<any>(null);

    if (totalPrice <= 40) {
        return <div className="text-center py-20">
            <i className="fas fa-shopping-cart text-5xl text-slate-200 mb-4 block"></i>
            <h2 className="text-2xl font-bold text-slate-800">Your Cart is Empty</h2>
            <button onClick={() => navigate('/')} className="mt-6 text-orange-500 font-bold hover:underline">Start Building a Burger</button>
        </div>;
    }

    const finalOrderSubmission = (orderData: any) => {
        setIsSubmitting(true);
        axios.post(`https://burger-builder-e7811-default-rtdb.firebaseio.com/order.json?auth=${token}`, orderData)
            .then(() => {
                setStatus({ type: 'success', message: 'Order placed successfully! Redirecting...' });
                setTimeout(() => navigate('/orders'), 2000);
            })
            .catch(() => {
                setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
                setIsSubmitting(false);
            });
    };

    const handlePaymentConfirm = (txId: string) => {
        const updatedOrder = {
            ...pendingOrderData,
            customer: {
                ...pendingOrderData.customer,
                transactionId: txId,
                paymentStatus: 'paid'
            }
        };
        setShowPaymentModal(false);
        finalOrderSubmission(updatedOrder);
    };

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
                    const order = {
                        customer: {
                            ...values,
                            paymentStatus: values.paymentType === 'Cash on Delivery' ? 'pending' : 'unpaid'
                        },
                        ingredients: ingredient,
                        price: totalPrice,
                        date: new Date().toISOString(),
                        userId: userId,
                    };

                    if (values.paymentType === 'Cash on Delivery') {
                        finalOrderSubmission(order);
                    } else {
                        setPendingOrderData(order);
                        setShowPaymentModal(true);
                    }
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
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    { id: 'Cash on Delivery', icon: 'money-bill-wave', color: 'slate' },
                                    { id: 'Bkash', icon: 'mobile-alt', color: 'pink' },
                                    { id: 'Card', icon: 'credit-card', color: 'blue' }
                                ].map(opt => (
                                    <label key={opt.id} className={`cursor-pointer group relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${values.paymentType === opt.id ? 'border-orange-500 bg-orange-50/50' : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'}`}>
                                        <input
                                            type="radio"
                                            name="paymentType"
                                            value={opt.id}
                                            checked={values.paymentType === opt.id}
                                            onChange={handleChange}
                                            className="sr-only"
                                        />
                                        <i className={`fas fa-${opt.icon} text-xl mb-2 ${values.paymentType === opt.id ? 'text-orange-500' : 'text-slate-400'}`}></i>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider text-center ${values.paymentType === opt.id ? 'text-orange-600' : 'text-slate-500'}`}>{opt.id === 'Card' ? 'Card' : opt.id}</span>
                                        {values.paymentType === opt.id && <i className="fas fa-check-circle absolute top-2 right-2 text-orange-500 text-xs"></i>}
                                    </label>
                                ))}
                            </div>
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
                                {isSubmitting ? <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : (values.paymentType === 'Cash on Delivery' ? 'Place Order' : 'Proceed to Pay')}
                            </button>
                        </div>
                    </form>
                )}
            </Formik>

            {showPaymentModal && pendingOrderData && (
                <PaymentModal 
                    type={pendingOrderData.customer.paymentType as any}
                    amount={totalPrice}
                    onConfirm={handlePaymentConfirm}
                    onCancel={() => setShowPaymentModal(false)}
                />
            )}
        </div>
    );
};

export default CheckoutPage;
