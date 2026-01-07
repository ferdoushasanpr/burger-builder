
import * as actionTypes from './actionTypes';
import axios from 'axios';
import { Dispatch } from 'redux';

const FIREBASE_URL = 'https://burger-builder-e7811-default-rtdb.firebaseio.com';

export const addIngredient = (igtype: string) => ({
    type: actionTypes.ADD_INGREDIENT,
    payload: igtype,
});

export const removeIngredient = (igtype: string) => ({
    type: actionTypes.REMOVE_INGREDIENT,
    payload: igtype,
});

export const updatePurchasable = () => ({
    type: actionTypes.UPDATE_PURCHASABLE,
});

const loadOrders = (orders: any) => ({
    type: actionTypes.LOAD_ORDERS,
    payload: orders,
});

export const fetchOrders = (token: string, userId: string) => (dispatch: Dispatch) => {
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axios
        .get(`${FIREBASE_URL}/order.json${queryParams}`)
        .then((res) => dispatch(loadOrders(res.data)))
        .catch((err) => console.error(err));
};
