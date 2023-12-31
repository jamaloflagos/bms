import { useState } from "react";
import { useUser } from "./useUser";


export const useLogin =  () => {
   const [error, setError] = useState(null)
   const [isLoading, setIsLoading] = useState(null)
   const {dispatch} = useUser()

   const login = async (email) => {
    setError(null)
    setIsLoading(true)

    const res = await fetch("https://bms-server-ashy.vercel.app/user/login", {
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
        console.log("logins");
        const data = await res.json()
        localStorage.setItem('user', JSON.stringify(data))
        setIsLoading(false)
        dispatch({type: "LOGIN", payload: data})
        console.log(data);
    }


   }

   return { error, isLoading, login }
 } 