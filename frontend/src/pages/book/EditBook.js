import { useEffect, useState } from "react"
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { useParams, useNavigate } from "react-router-dom";

const EditBook = () => {
    const { name, nickname, status, author, publisher } = JSON.parse(localStorage.getItem("singleBook"));
    const authorsName = JSON.parse(localStorage.getItem("authorsName"));
    const publishersName = JSON.parse(localStorage.getItem("publishersName"));

    const { id } = useParams();
    const url = `https://bms-server-ashy.vercel.app/book/${id}`
    const [ error, handleSubmit, isLoading ] = useFormSubmit(url);
    
    
    const [newName, setNewName] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [newNickname, setNewNickname] = useState("");
    const [newAuthor, setNewAuthor] = useState("");
    const [newPublisher, setNewPublisher] = useState("");
    
    const to = "/";
    const dispatchType = "EDIT_BOOK"
    const bookData = {
        name: newName,
        nickname: newNickname,
        status: newStatus,
        author: newAuthor,
        publisher: newPublisher
    }


    useEffect(() => {
        setNewName(name);
        setNewStatus(status);
        setNewNickname(nickname);
        setNewAuthor(author._id);
        setNewPublisher(publisher._id);
    }, [])

   
  return (
    <div>
        <form onSubmit={(e) => handleSubmit(e, bookData, to, dispatchType)}>
            <label htmlFor="name">Name</label>
            <input 
                type="text"
                name="name"
                id="name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
            />

            <br />

            <label htmlFor="nickname">Nickname</label>
            <input 
                type="text"
                name="nickname"
                id="nickname"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
            />

            <br />

            <label htmlFor="status">Status</label>
            <input 
                type="text"
                name="status"
                id="status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
            />

            <br />
            <label htmlFor="author">Author Name</label>
            <select 
                name="author"
                id="author"
                onChange={(e) => setNewAuthor(e.target.value)}
            >
                <option value="">Choose</option>
                {authorsName && authorsName.map(author => (
                    <option value={author._id} key={author._id}>{author.name}</option>
                ))}
            </select>

            <br />
            <label htmlFor="publisher">Publisher Name</label>
            <select 
                name="publisher"
                id="publisher"
                onChange={(e) => setNewPublisher(e.target.value)}
            >
                <option value="">Choose</option>
                {publishersName && publishersName.map(publisher => (
                    <option value={publisher._id} key={publisher._id}>{publisher.name}</option>
                ))}
            </select>

            {error && <h1>{error}</h1>}
            <button type="submit" disabled={isLoading}>Add</button>
            </form>
    </div>
  )
}
export default EditBook