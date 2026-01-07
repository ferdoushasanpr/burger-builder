
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../redux/actionCreator';
import { RootState, Order } from '../types';

const OrdersPage: React.FC = () => {
    const dispatch = useDispatch();
    const { orders, token, userId } = useSelector((state: RootState) => state);

    useEffect(() => {
        if (token && userId) {
            dispatch(fetchOrders(token, userId) as any);
        }
    }, [dispatch, token, userId]);

    if (orders.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fas fa-box-open text-3xl text-slate-300"></i>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">No orders yet</h2>
                <p className="text-slate-500 mt-2">Hungry? Your first custom burger is just clicks away.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <header className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">Your Order History</h2>
                    <p className="text-slate-500 mt-1">Track your previous burger creations</p>
                </div>
                <div className="px-4 py-2 bg-slate-100 rounded-full text-sm font-bold text-slate-600">
                    Total Orders: {orders.length}
                </div>
            </header>

            <div className="space-y-6">
                {orders.map((order: Order) => (
                    <div key={order.id} className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-100 hover:shadow-xl transition-all group overflow-hidden relative">
                        {/* Status badge */}
                        <div className="absolute top-0 right-0 px-6 py-2 bg-green-500 text-white text-xs font-bold rounded-bl-3xl">
                            COMPLETED
                        </div>

                        <div className="flex flex-col md:flex-row justify-between gap-8">
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500">
                                        <i className="fas fa-receipt text-xl"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">Order #{order.id.slice(-6).toUpperCase()}</h4>
                                        <p className="text-xs text-slate-400 font-medium">{new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {order.ingredients.filter(ig => ig.amount > 0).map((ig, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-slate-50 rounded-lg text-xs font-semibold text-slate-600 border border-slate-100 capitalize">
                                            {ig.amount}x {ig.type}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col justify-between items-end min-w-[140px] border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
                                <div className="text-right w-full">
                                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Total Paid</span>
                                    <span className="text-2xl font-black text-slate-900">{order.price.toFixed(0)} <span className="text-xs font-bold text-slate-400">BDT</span></span>
                                </div>
                                <div className="mt-4 w-full">
                                    <p className="text-xs text-slate-500 flex items-start">
                                        <i className="fas fa-map-marker-alt mt-0.5 mr-2 text-red-400"></i>
                                        <span className="line-clamp-2 italic">{order.customer.deliveryAddress}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersPage;
