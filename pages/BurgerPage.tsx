
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls';
import { addIngredient, removeIngredient, updatePurchasable } from '../redux/actionCreator';
import { RootState } from '../types';

const BurgerPage: React.FC = () => {
    const dispatch = useDispatch();
    const { ingredient, totalPrice, purchasable } = useSelector((state: RootState) => state);
    const [showSummary, setShowSummary] = useState(false);

    const onAdd = (type: string) => {
        dispatch(addIngredient(type));
        dispatch(updatePurchasable());
    };

    const onRemove = (type: string) => {
        dispatch(removeIngredient(type));
        dispatch(updatePurchasable());
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Visual Preview Section */}
                <div className="order-2 lg:order-1">
                    <header className="mb-8 text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Build Your Signature Burger</h2>
                        <p className="text-slate-500">Customize every layer to your liking. Only the freshest ingredients.</p>
                    </header>
                    <Burger ingredients={ingredient} />
                </div>

                {/* Controls Section */}
                <div className="order-1 lg:order-2">
                    <BuildControls
                        ingredients={ingredient}
                        price={totalPrice}
                        addIngredient={onAdd}
                        removeIngredient={onRemove}
                        purchasable={purchasable}
                        onOrder={() => setShowSummary(true)}
                    />
                </div>
            </div>

            {/* Modern Modal Overlay */}
            {showSummary && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-800">Order Summary</h3>
                            <button onClick={() => setShowSummary(false)} className="text-slate-400 hover:text-slate-600">
                                <i className="fas fa-times text-xl"></i>
                            </button>
                        </div>
                        <div className="p-8">
                            <div className="space-y-4 mb-8">
                                {ingredient.filter(ig => ig.amount > 0).map(ig => (
                                    <div key={ig.type} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                                        <span className="capitalize font-semibold text-slate-700">{ig.type}</span>
                                        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">x{ig.amount}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center mb-8 px-2">
                                <span className="text-slate-500 font-medium">Total Price</span>
                                <span className="text-2xl font-black text-slate-900">{totalPrice.toFixed(0)} BDT</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <button 
                                    onClick={() => setShowSummary(false)}
                                    className="py-3 text-slate-600 font-semibold hover:bg-slate-50 rounded-xl transition-all"
                                >
                                    Go Back
                                </button>
                                <Link
                                    to="/checkout"
                                    className="py-3 bg-orange-500 text-white rounded-xl font-bold text-center hover:bg-orange-600 transition-all shadow-lg shadow-orange-100"
                                >
                                    Continue
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BurgerPage;
