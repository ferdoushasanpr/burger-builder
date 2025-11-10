import axios from 'axios';
import * as actionTypes from './actionTypes';

const authSuccess = (token, userId, email) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId,
            email: email,
        },
    };
};

const authFailed = (message) => {
    return {
        type: actionTypes.AUTH_FAILED,
        payload: message,
    };
};

export const authUser = (email, password, mode) => (dispatch) => {
    const user = {
        email: email,
        password: password,
        returnSecureToken: true,
    };
    let apiUrl = null;
    if (mode === 'sign-up') {
        apiUrl =
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
    } else {
        apiUrl =
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
    }
    const API_KEY = 'AIzaSyCXo6ZyjeVB8LsEYQAOF7L3Ks4WDDrR0Z0';
    axios
        .post(apiUrl + API_KEY, user)
        .then((res) => {
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('userId', res.data.localId);
            const expirationTime =
                new Date().getTime() + new Date(res.data.expiresIn * 1000);
            localStorage.setItem('expirationTime', expirationTime);
            dispatch(
                authSuccess(res.data.idToken, res.data.localId, res.data.email)
            );
        })
        .catch((err) => dispatch(authFailed(err.response.data.error.message)));
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationTime');
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const authCheck = () => (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(logout());
    } else {
        const expirationTime = localStorage.getItem('expirationTime');
        if (new Date(expirationTime) <= new Date().getTime()) {
            dispatch(logout());
        } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
        }
    }
};
