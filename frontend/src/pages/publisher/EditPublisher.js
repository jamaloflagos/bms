import { useParams } from "react-router-dom"
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { useEffect, useState } from "react";

const EditPublisher = () => {
    const {name, address, email, country, phone} = JSON.parse(localStorage.getItem("singlePublisher"))
    const { id } = useParams();
    const url = `https://bms-server-ashy.vercel.app/author/${id}`
    const [ handleSubmit, error, isLoading ] = useFormSubmit(url);

    const [newName, setNewName] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newCountry, setNewCountry] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPhone, setNewPhone] = useState("");
    
    const dispatchType = "EDIT_AUTHOR"
    const to = "/authors"
    const publisherData = {
        name: newName,
        address: newAddress,
        email: newEmail,
        country: newCountry,
        phone: newPhone
    }

    
    useEffect(() => {
        setNewName(name);
        setNewAddress(address);
        setNewCountry(country);
        setNewEmail(email);
        setNewPhone(phone);
    }, [])
  return (
    <div>
        <form onSubmit={(e) => handleSubmit(e, publisherData, to, dispatchType)}>
            <label htmlFor="name">Name</label>
            <input 
                type="text" 
                name="name" 
                id="name"
                onChange={(e) => setNewName(e.target.value)}
                value={newName} 
            />
            
            <label htmlFor="address">Address</label>
            <input 
                type="text" 
                name="address" 
                id="address"
                onChange={(e) => setNewAddress(e.target.value)}
                value={newAddress} 
            />

            <label htmlFor="country">Country</label>
            <input 
                type="text" 
                name="country" 
                id="country"
                onChange={(e) => setNewCountry(e.target.value)}
                value={newCountry} 
            />

            <label htmlFor="email">Email</label>
            <input 
                type="text" 
                name="email" 
                id="email"
                onChange={(e) => setNewEmail(e.target.value)}
                value={newEmail} 
            />

            <label htmlFor="phone">Phone</label>
            <input 
                type="text" 
                name="phone" 
                id="phone"
                onChange={(e) => setNewPhone(e.target.value)}
                value={newPhone} 
            />

            {error && <h1>{error}</h1>}
            <button type="submit" disabled={isLoading}>Add</button>
        </form>
    </div>
  )
}
export default EditPublisher