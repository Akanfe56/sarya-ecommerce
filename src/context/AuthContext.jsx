import {  createContext, useReducer } from "react";


export const AuthContext = createContext();


let initialState = {
    accessToken: null
}

function reducer (state, action) {
    if(action.type === "setToken"){
        return { ...state, accessToken: action.payload }
    }
    return state;
}

export const AuthProvider = ({ children, defaultState = initialState}) => {
    const [ state, dispatch] = useReducer(reducer, defaultState);
    return (
        <AuthContext.Provider value={[state, dispatch]}>
            {children}
        </AuthContext.Provider>
    )
}