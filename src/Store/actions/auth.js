import * as actionTypes from './actionTypes';
import axios from 'axios';
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}
export const checkAuthTimeout = (expirationTime) => {
    return dispatch =>{
        setTimeout(()=> {
            dispatch(logout());
        }, expirationTime * 1000)
    };
};
export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBrB7P4u-D0El8Ul9XQe44V8qpN13IfUFU';
        if(!isSignUp){
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBrB7P4u-D0El8Ul9XQe44V8qpN13IfUFU"
        }
        axios.post(url, authData)
            .then(res => {
                console.log(res);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            })
    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}


