
import axios from 'axios';
import * as actionTypes from './actionTypes';
import { Dispatch } from 'redux';

const API_KEY = 'AIzaSyCXo6ZyjeVB8LsEYQAOF7L3Ks4WDDrR0Z0';

const authSuccess = (token: string, userId: string, email: string) => ({
    type: actionTypes.AUTH_SUCCESS,
    payload: { token, userId, email },
});

const authFailed = (message: string) => ({
    type: actionTypes.AUTH_FAILED,
    payload: message,
});

export const authUser = (email: string, password: string, mode: string) => (dispatch: Dispatch) => {
    const user = { email, password, returnSecureToken: true };
    const apiUrl = mode === 'sign-up' 
        ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
        : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

    axios.post(apiUrl + API_KEY, user)
        .then((res) => {
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('userId', res.data.localId);
            localStorage.setItem('email', res.data.email);
            const expirationTime = new Date().getTime() + parseInt(res.data.expiresIn) * 1000;
            localStorage.setItem('expirationTime', expirationTime.toString());
            dispatch(authSuccess(res.data.idToken, res.data.localId, res.data.email));
        })
        .catch((err) => {
            const errorMsg = err.response?.data?.error?.message || "An authentication error occurred.";
            dispatch(authFailed(errorMsg));
        });
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('expirationTime');
    return { type: actionTypes.AUTH_LOGOUT };
};

export const authCheck = () => (dispatch: any) => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(logout());
    } else {
        const expirationTime = localStorage.getItem('expirationTime');
        if (expirationTime && new Date(parseInt(expirationTime)) <= new Date()) {
            dispatch(logout());
        } else {
            const userId = localStorage.getItem('userId');
            const email = localStorage.getItem('email');
            dispatch(authSuccess(token!, userId!, email!));
        }
    }
};
