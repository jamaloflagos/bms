import { useEffect, useState } from "react";
import { useFormSubmit } from "../../hooks/useFormSubmit"
import { useParams } from "react-router-dom";

const EditAuthor = () => {
    const { id } = useParams();
    const { name, description, position, gender, yod, dob} = JSON.parse(localStorage.getItem("singleAuthor"));
    const url = `http:localhost:4000/author/${id}`
    const [error, isLoading, handleSubmit] = useFormSubmit(url);

    const [newName, setNewName] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newPosition, setNewPosition] = useState("");
    const [newGender, setNewGender] = useState("");
    const [newDOB, setNewDOB] = useState("");
    const [newYOD, setNewYOD] = useState("");


    const to = "/authors"
    const dispatchType = "EDIT_AUTHOR"
    const authorData = {
        name: newName,
        description: newDescription,
        position: newPosition,
        gender: newGender,
        dob: newDOB,
        yod: newYOD
    }

    useEffect(() => {
        setNewName(name);
        setNewDescription(description);
        setNewGender(gender);
        setNewPosition(position);
        setNewDOB(dob);
        setNewYOD(yod);
    }, [])
  return (
    <div>
    <form onSubmit={(e) => handleSubmit(e, authorData, to, dispatchType)}>
      <label htmlFor="name">Name</label>
      <input 
        type="text" 
        name="name" 
        id="name"
        onChange={(e) => setNewName(e.target.value)}
        value={newName} 
      />
      
      <br />
      <label htmlFor="description">Description</label>
      <input 
        type="text" 
        name="description" 
        id="description"
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription} 
      />

      <br />
      <label htmlFor="position">Position</label>
      <input 
        type="text" 
        name="position" 
        id="position"
        onChange={(e) => setNewPosition(e.target.value)}
        value={newPosition} 
      />

      <br />
      <label htmlFor="gender">Gender</label>
      <input 
        type="text" 
        name="gender" 
        id="gender"
        onChange={(e) => setNewGender(e.target.value)}
        value={newGender} 
      />

      <br />
      <label htmlFor="dob">D_O_B</label>
      <input 
        type="date" 
        name="dob" 
        id="dob"
        onChange={dob}
        value={newDOB} 
      />

      <br />
      <label htmlFor="yod">Y_O_D</label>
      <input 
        type="date" 
        name="yod" 
        id="yod"
        onChange={(e) => setNewYOD(e.target.value)}
        value={newYOD} 
      />

      {error && <h1>{error}</h1>}
      <button type="submit" disabled={isLoading}>Add</button>
    </form>
    </div>
  )
}
export default EditAuthor