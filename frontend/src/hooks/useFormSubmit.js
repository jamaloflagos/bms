import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useBook } from "../hooks/useBook"
import { useUser } from "../hooks/useUser"

export const useFormSubmit = (url) => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { dispatch } = useBook();
    const [error, setError] = useState("");

    const handleSubmit = async(e, formData) => {
        e.preventDefault();
        // setIsloading(true);

        if(!user) {
            return
        }

        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                "Authorization": `Bearer ${user.accessToken}`,
                "Content-Type": "application/json"
            }

        })

        console.log(res);

        if(!res.ok) {
            const error = await res.json()
            setError(error.message)
        }

        if(res.ok) {
            const data = await res.json();
            // setIsloading(false);
            console.log(data)
            dispatch({type: "ADD_BOOK", payload: data});
            navigate("/");
        } 

        if(!user) {
            setError("User not authenticated")
        }
    }

  return [error, handleSubmit]
}