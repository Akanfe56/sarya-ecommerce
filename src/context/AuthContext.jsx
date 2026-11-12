/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useReducer } from "react";
import { supabase } from "../services/supabase";


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

    useEffect(() => {
        if (!supabase) return undefined;

        let mounted = true;
        supabase.auth.getSession().then(({ data }) => {
            if (!mounted) return;
            const token = data.session?.access_token || null;
            if (token) localStorage.setItem("auth-token", token);
            else localStorage.removeItem("auth-token");
            dispatch({ type: "setToken", payload: token });
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            const token = session?.access_token || null;
            if (token) localStorage.setItem("auth-token", token);
            else localStorage.removeItem("auth-token");
            dispatch({ type: "setToken", payload: token });
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={[state, dispatch]}>
            {children}
        </AuthContext.Provider>
    )
}
