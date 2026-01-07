
import React from 'react';
import { IngredientItem } from '../../types';

interface BuildControlsProps {
    ingredients: IngredientItem[];
    price: number;
    addIngredient: (type: string) => void;
    removeIngredient: (type: string) => void;
    onOrder: () => void;
    purchasable: boolean;
}

const controls = [
    { label: "Salad", type: "salad", icon: "leaf", color: "green" },
    { label: "Cheese", type: "cheese", icon: "cheese", color: "yellow" },
    { label: "Meat", type: "meat", icon: "drumstick-bite", color: "red" },
];

const BuildControls: React.FC<BuildControlsProps> = ({ 
    ingredients, 
    price, 
    addIngredient, 
    removeIngredient, 
    onOrder, 
    purchasable 
}) => {
    return (
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 h-fit">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <i className="fas fa-utensils mr-3 text-orange-500"></i>
                Build Your Masterpiece
            </h3>

            <div className="space-y-4 mb-8">
                {controls.map((ctrl) => {
                    const amount = ingredients.find(i => i.type === ctrl.type)?.amount || 0;
                    return (
                        <div key={ctrl.type} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-all">
                            <div className="flex items-center">
                                <div className={`w-10 h-10 flex items-center justify-center rounded-xl bg-${ctrl.color}-100 text-${ctrl.color}-600 mr-3`}>
                                    <i className={`fas fa-${ctrl.icon}`}></i>
                                </div>
                                <span className="font-semibold text-slate-700">{ctrl.label}</span>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => removeIngredient(ctrl.type)}
                                    disabled={amount <= 0}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                                >
                                    <i className="fas fa-minus text-xs"></i>
                                </button>
                                <span className="w-6 text-center font-bold text-slate-900">{amount}</span>
                                <button
                                    onClick={() => addIngredient(ctrl.type)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-green-500 hover:border-green-200 transition-all shadow-sm"
                                >
                                    <i className="fas fa-plus text-xs"></i>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="border-t border-slate-100 pt-6">
                <div className="flex justify-between items-end mb-6">
                    <span className="text-slate-400 font-medium">Estimated Total</span>
                    <span className="text-3xl font-black text-slate-900">{price.toFixed(0)} <span className="text-sm font-bold text-slate-400">BDT</span></span>
                </div>

                <button
                    onClick={onOrder}
                    disabled={!purchasable}
                    className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold text-lg hover:bg-orange-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all transform active:scale-95 shadow-lg shadow-orange-200 flex items-center justify-center group"
                >
                    Order Now
                    <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                </button>
            </div>
        </div>
    );
};

export default BuildControls;
