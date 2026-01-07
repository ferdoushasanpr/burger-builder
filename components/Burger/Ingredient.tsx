
import React from 'react';

interface IngredientProps {
    type: string;
    style?: React.CSSProperties;
}

const Ingredient: React.FC<IngredientProps> = ({ type }) => {
    const styles: Record<string, string> = {
        'bread-top': 'bg-gradient-to-b from-orange-300 to-orange-400 h-16 w-64 rounded-t-full relative shadow-inner overflow-hidden',
        'bread-bottom': 'bg-gradient-to-t from-orange-300 to-orange-400 h-12 w-64 rounded-b-3xl shadow-md border-t-2 border-orange-200',
        'salad': 'bg-gradient-to-r from-green-400 to-green-500 h-4 w-60 rounded-full shadow-sm border-2 border-green-300 mx-auto -mt-1',
        'cheese': 'bg-gradient-to-r from-yellow-300 to-yellow-400 h-3 w-64 rounded-sm shadow-sm border-t-2 border-yellow-200 mx-auto -mt-1',
        'meat': 'bg-gradient-to-r from-red-800 to-red-900 h-8 w-60 rounded-xl shadow-md border-2 border-red-950 mx-auto -mt-1',
    };

    if (type === 'bread-top') {
        return (
            <div className={styles[type]}>
                {/* Seeds */}
                {[...Array(12)].map((_, i) => (
                    <div 
                        key={i} 
                        className="absolute bg-white/40 w-1.5 h-1 rounded-full" 
                        style={{ 
                            top: `${20 + Math.random() * 40}%`, 
                            left: `${15 + Math.random() * 70}%`,
                            transform: `rotate(${Math.random() * 360}deg)`
                        }}
                    ></div>
                ))}
            </div>
        );
    }

    return <div className={`${styles[type]} transition-all duration-300 ease-out transform scale-100 hover:scale-105`}></div>;
};

export default Ingredient;
