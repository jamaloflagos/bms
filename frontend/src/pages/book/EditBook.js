import { useEffect, useState } from "react"
import { useBook } from "../../hooks/useBook";
import { useUser } from "../../hooks/useUser";
import { useParams, useNavigate } from "react-router-dom";

const EditBook = () => {
    const { name, nickname, status, author, publisher } = JSON.parse(localStorage.getItem("singleBook"));
    const authorsName = JSON.parse(localStorage.getItem("authorsName"));
    const publishersName = JSON.parse(localStorage.getItem("publishersName"));

    const { dispatch } = useBook();
    const { user } = useUser();
    const { id } = useParams();
    const navigate = useNavigate();

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [newName, setNewName] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [newNickname, setNewNickname] = useState("");
    const [newAuthor, setNewAuthor] = useState("");
    const [newPublisher, setNewPublisher] = useState("");

    useEffect(() => {
        setNewName(name);
        setNewStatus(status);
        setNewNickname(nickname);
        setNewAuthor(author._id);
        setNewPublisher(publisher._id);
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const bookData = {
            name: newName,
            nickname: newNickname,
            status: newStatus,
            author: newAuthor,
            publisher: newPublisher
        }

        try {
            const res = await fetch(`http://localhost:4000/book/${id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${user.accessToken}`,
                    "Content-type": "application/json"
                },
                body: JSON.stringify(bookData)
            })
            
            if (res.status === 400 || res.status === 500) {
                const { message } = await res.json();
                setError(message);
                setLoading(false);
            }

            if (res.ok) {
                const data = await res.json();
                dispatch({type: "EDIT_BOOK", payload: data});

                setLoading(false);
                navigate("/")
            }
        } catch (err) {
            const error = `${err.name}: ${err.message}`
            setError(error);

            setLoading(false)
        }
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
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