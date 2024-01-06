import { useForm } from "../../hooks/useForm"
import { useFormSubmit } from "../../hooks/useFormSubmit";

const AddAuthor = () => {
    const url = "https://bms-server-ashy.vercel.app/author"
    const to = "/authors"
    const dispatchType = "ADD_AUTHOR"
    const data = {
      name: "",
      description: "",
      gender: "",
      position: "",
      dob: "",
      yod: ""
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
      
      <br />
      <label htmlFor="description">Description</label>
      <input 
        type="text" 
        name="description" 
        id="description"
        onChange={onChange}
        value={formData.description} 
      />

      <br />
      <label htmlFor="position">Position</label>
      <input 
        type="text" 
        name="position" 
        id="position"
        onChange={onChange}
        value={formData.position} 
      />

      <br />
      <label htmlFor="gender">Gender</label>
      <input 
        type="text" 
        name="gender" 
        id="gender"
        onChange={onChange}
        value={formData.gender} 
      />

      <br />
      <label htmlFor="dob">D_O_B</label>
      <input 
        type="date" 
        name="dob" 
        id="dob"
        onChange={onChange}
        value={formData.dob} 
      />

      <br />
      <label htmlFor="yod">Y_O_D</label>
      <input 
        type="date" 
        name="yod" 
        id="yod"
        onChange={onChange}
        value={formData.yod} 
      />

      {error && <h1>{error}</h1>}
      <button type="submit" disabled={isLoading}>Add</button>
    </form>
  )
}
export default AddAuthor