import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useBook } from "../hooks/useBook"
import { useUser } from "../hooks/useUser"

export const useFormSubmit = (url) => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { dispatch } = useBook();
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async(e, formData, to, dispatchType) => {
        setLoading(true);
        e.preventDefault();        

        try {
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    "Authorization": `Bearer ${user.accessToken}`,
                    "Content-Type": "application/json"
                }
            })
    
            if(res.status === 400) {
                const {message} = await res.json();
                setError(message);

                setLoading(false)
            }
    
            if(res.ok) {
                const data = await res.json();
                dispatch({type: dispatchType, payload: data});

                setLoading(false);
                navigate(to);
            } 

            if (res.status === 401) {
                setLoading(false);
                throw new Error("Unauthorized, please login");;
            }
            
            if (res.status === 403) {
                setLoading(false);
                throw Error("Forbidden request, please login");
            }
            
        } catch (err) {
            const error = `${err.name}: ${err.message}`
            setError(error);  
            console.log(error);
            setLoading(false);
        }

        if(!user) {
            setError("User not authenticated")
        }
    }

  return [error, handleSubmit, isLoading]
}