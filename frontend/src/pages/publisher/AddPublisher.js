import { useForm } from "../../hooks/useForm"
import { useFormSubmit } from "../../hooks/useFormSubmit";

const AddPublisher = () => {
    const url = "https://bms-server-ashy.vercel.app/publisher"
    const to = "/publishers"
    const dispatchType = "ADD_PUBLISHER"
    const data = {
      name: "",
      address: "",
      country: "",
      email: "",
      phone: "",
    }

    const [formData, onChange] = useForm(data);
    const [error, handleSubmit, isLoading] = useFormSubmit(url);
  return (
    <form onSubmit={(e) => handleSubmit(e, formData, to, dispatchType)}>
      <label htmlFor="name">Name</label>
      <input 
        type="text" 
        name="name" 
        id="name"
        onChange={onChange}
        value={formData.name} 
      />
      
      <label htmlFor="address">Address</label>
      <input 
        type="text" 
        name="address" 
        id="address"
        onChange={onChange}
        value={formData.address} 
      />

      <label htmlFor="country">Country</label>
      <input 
        type="text" 
        name="country" 
        id="country"
        onChange={onChange}
        value={formData.country} 
      />

      <label htmlFor="email">Email</label>
      <input 
        type="text" 
        name="email" 
        id="email"
        onChange={onChange}
        value={formData.email} 
      />

      <label htmlFor="phone">Phone</label>
      <input 
        type="text" 
        name="phone" 
        id="phone"
        onChange={onChange}
        value={formData.phone} 
      />

      {error && <h1>{error}</h1>}
      <button type="submit" disabled={isLoading}>Add</button>
    </form>
  )
}
export default AddPublisher