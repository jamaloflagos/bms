import { createContext, useReducer, useEffect } from "react";

export const UserContext = createContext();

const reducer = (state, { type, payload }) => {
    switch(type) {
        case "LOGIN": 
            return {
                user: payload
            }
        case "LOGOUT":
            return {
                user: null
            }
        default: return state
    }
}

export const UserContextProvider = ({children}) => {
    const [user, dispatch] = useReducer(reducer, {
        user: null
    })
    
    useEffect(()=> {
        const user = JSON.parse(localStorage.getItem("user"))
    
        if (user) {
            dispatch({type: "LOGIN", payload: user});
        }
    },[])

    return(
        <UserContext.Provider value = {{...user, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}