import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addIngredient = (igtype) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: igtype,
    };
};

export const removeIngredient = (igtype) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: igtype,
    };
};

export const updatePurchasable = () => {
    return {
        type: actionTypes.UPDATE_PURCHASABLE,
    };
};

const loadOrders = (orders) => {
    return {
        type: actionTypes.LOAD_ORDERS,
        payload: orders,
    };
};

export const fetchOrders = (token, userId) => (dispatch) => {
    const queryParams = '&orderBy="userId"&equalTo="' + userId + '"';
    axios
        .get(
            'https://burger-builder-50739-default-rtdb.firebaseio.com/order.json?auth=' +
                token +
                queryParams
        )
        .then((res) => dispatch(loadOrders(res.data)))
        .catch((err) => console.log(err));
};
