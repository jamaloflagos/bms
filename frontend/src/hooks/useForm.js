import { useState } from "react"
export const useForm = (data) => {

    const [ formData, setFormData ] = useState(data);

    const onChange = (e) => {
        const { type, value, name, checked} = e.target       
        setFormData(psv => {
            return {
                ...psv, 
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

  return [formData, onChange]
}