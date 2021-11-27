import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_USER: "LOGIN_USER",
    SET_ERROR_MSG: "SET_ERROR_MSG",
    LOGOUT_USER: "LOGOUT_USER"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        errorMsg: null
    });
    const history = useHistory();

    useEffect(() => {
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errorMsg: auth.errorMsg
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errorMsg: auth.errorMsg
                })
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn:true,
                    errorMsg: auth.errorMsg
                })
            }
            case AuthActionType.SET_ERROR_MSG: {
                return setAuth({
                    user: auth.user,
                    loggedIn: auth.loggedIn,
                    errorMsg: payload.errorMsg
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMsg: auth.errorMsg
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        try{
            const response = await api.getLoggedIn();
            if (response.status === 200) {
                console.log(auth.errorMsg)
                authReducer({
                    type: AuthActionType.GET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user
                    }
                });
            }
        }
        catch(err){
            console.log(err);
        }
    }

    auth.registerUser = async function(userData, store) {
        try{
            const response = await api.registerUser(userData);      
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                // GO TO HOME SCREEN AND LOAD THE RIGHT LISTS
                history.push("/home");
                store.loadLoggedInLists();
            }
        }
        catch(err){
            auth.setErrorMsg(err.response.data.errorMessage);
        }
    }
    
    auth.setErrorMsg = function (newMsg) {
        authReducer({
            type: AuthActionType.SET_ERROR_MSG,
            payload: {
                errorMsg: newMsg
            } 
        })
    }

    auth.loginUser = async function(userData, store) {
        try{
            const response = await api.loginUser(userData);
            if(response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/home");
                store.loadIdNamePairs();
            }
        }
        catch(err){
            auth.setErrorMsg(err.response.data.errorMessage);
        }
    }

    auth.logoutUser = async function () {
        try{
            const response = await api.logoutUser();
            if(response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGOUT_USER,
                    payload: {
                    }
                })
            }
        }
        catch(err){
            console.log(err);
        }
        history.push("/");
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };