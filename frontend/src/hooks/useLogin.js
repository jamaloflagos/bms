import { useState } from "react";
import { useUser } from "./useUser";


export const useLogin =  () => {
   const [error, setError] = useState(null)
   const [isLoading, setIsLoading] = useState(null)
   const {dispatch} = useUser()

   const login = async (email) => {
    setError(null)
    setIsLoading(true)

    const res = await fetch("http://localhost:4000/user/login", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email}),
    })

    
    if(!res.ok) {
        const error = await res.json()
        setError(error.message)
        setIsLoading(false)
        console.log(error.message);
        
    }
    
    if(res.ok) {
        const data = await res.json()
        localStorage.setItem('user', JSON.stringify(data));
        setIsLoading(false)
        dispatch({type: "LOGIN", payload: data});
    }

   }

   const refresh = async () => {
    try {
        const res = await fetch("http:localhost:4000/user/refresh");

        if (res.status === 401) {
            throw Error("Unauthorized");
        }

        if (res.ok) {
            const data = await res.json()
            localStorage.setItem('user', JSON.stringify(data));
            dispatch({type: "LOGIN", payload: data});
        }
        
    } catch (error) {
        setError(error);
    }
   }

   return { error, isLoading, login, refresh }
 } 