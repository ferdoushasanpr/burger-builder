import * as actionTypes from "./actionTypes";

const INGREDIENT_PRICE = {
    salad: 15,
    cheese: 30,
    meat: 80,
};

const INIT_STATE = {
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

export const reducer = (state = INIT_STATE, action) => {
    const ingredients = [...state.ingredient];
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            for (let item of ingredients) {
                if (item.type === action.payload) item.amount++;
            }
            return {
                ...state,
                ingredient: ingredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.payload],
            };
        case actionTypes.REMOVE_INGREDIENT:
            for (let item of ingredients) {
                if (item.type === action.payload) {
                    if (item.amount <= 0) return;
                    item.amount--;
                }
            }
            return {
                ...state,
                ingredient: ingredients,
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.payload],
            };
        case actionTypes.UPDATE_PURCHASABLE:
            const sum = ingredients.reduce((sum, element) => {
                return sum + element.amount;
            }, 0);
            return {
                ...state,
                purchasable: sum > 0,
            };
        case actionTypes.LOAD_ORDERS:
            const Arr = [];
            for (let order in action.payload) {
                action.payload[order].id = order;
                Arr.push(action.payload[order]);
            }
            return {
                ...state,
                orders: Arr,
            };
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
