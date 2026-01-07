
import React from 'react';
import Ingredient from './Ingredient';
import { IngredientItem } from '../../types';

interface BurgerProps {
    ingredients: IngredientItem[];
}

const Burger: React.FC<BurgerProps> = ({ ingredients }) => {
    let ingredientStack = ingredients
        .map((ig) => [...Array(ig.amount)].map((_, i) => <Ingredient key={`${ig.type}-${i}`} type={ig.type} />))
        .reduce((arr, el) => arr.concat(el), []);

    return (
        <div className="flex flex-col items-center justify-center space-y-1 py-8 px-4 bg-white/50 rounded-3xl border-2 border-dashed border-slate-200 min-h-[450px] float-animation">
            <Ingredient type="bread-top" />
            {ingredientStack.length === 0 ? (
                <div className="py-12 px-8 text-center bg-orange-100/30 rounded-2xl border-2 border-dotted border-orange-200">
                    <p className="text-orange-500 font-medium italic">Start adding delicious ingredients!</p>
                </div>
            ) : (
                <div className="flex flex-col-reverse space-y-reverse space-y-1">
                    {ingredientStack}
                </div>
            )}
            <Ingredient type="bread-bottom" />
        </div>
    );
};

export default Burger;
