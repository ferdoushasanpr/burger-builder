
import * as actionTypes from "./actionTypes";
import { RootState } from "../types";

const INGREDIENT_PRICE: Record<string, number> = {
    salad: 15,
    cheese: 30,
    meat: 80,
};

const INIT_STATE: RootState = {
    ingredient: [
        { type: "salad", amount: 0 },
        { type: "cheese", amount: 0 },
        { type: "meat", amount: 0 },
    ],
    totalPrice: 40,
    purchasable: false,
    orders: [],
    token: null,
    userId: null,
    email: null,
    error: null,
};

export const reducer = (state = INIT_STATE, action: any): RootState => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: {
            const ingredients = state.ingredient.map(item => 
                item.type === action.payload ? { ...item, amount: item.amount + 1 } : item
            );
            return {
                ...state,
                ingredient: ingredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.payload],
            };
        }
        case actionTypes.REMOVE_INGREDIENT: {
            const target = state.ingredient.find(i => i.type === action.payload);
            if (!target || target.amount <= 0) return state;
            
            const ingredients = state.ingredient.map(item => 
                item.type === action.payload ? { ...item, amount: item.amount - 1 } : item
            );
            return {
                ...state,
                ingredient: ingredients,
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.payload],
            };
        }
        case actionTypes.UPDATE_PURCHASABLE: {
            const sum = state.ingredient.reduce((sum, element) => sum + element.amount, 0);
            return {
                ...state,
                purchasable: sum > 0,
            };
        }
        case actionTypes.LOAD_ORDERS: {
            const orderList = [];
            for (let id in action.payload) {
                orderList.push({ ...action.payload[id], id });
            }
            // Sort by date descending
            orderList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            return {
                ...state,
                orders: orderList,
            };
        }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
                email: action.payload.email,
                error: null,
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
                email: null,
                ingredient: INIT_STATE.ingredient,
                totalPrice: INIT_STATE.totalPrice,
                purchasable: false,
                orders: []
            };
        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};
