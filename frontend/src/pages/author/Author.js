import { useEffect, useState } from "react"
import { useAuthor } from "../../hooks/useAuthor";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

const Author = () => {
    const { id } = useParams();
    const { user } = useUser();
    const { deleteAuthor } = useAuthor();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [filteredAuthor, setFilteredAuthor] = useState(null);
    const [authors] = useAuthor();
    const navigate = useNavigate();

    const fetchAuthor = async () => {
        try {
            const res = await fetch(`http://localhost:4000/author/${id}`);

            if (res.status === 204 || res.status === 400) {
                const { message } = await res.json();
                setMessage(message);

                setLoading(false);
            }

            if (res.ok && res.status !== 204) {
                const data = await res.json();

                setFilteredAuthor(authors && authors.filter(author => author._id === data._id));
                setLoading(false);
            }
        } catch (err) {
            const error = `${err.name}: ${err.message}`
            setError(error);  
        }
    }

    useEffect(() => {
        fetchAuthor()
    }, [])

    const handleAuthorEdit = () => {
        localStorage.setItem("singleAuthor", JSON.stringify(...filteredAuthor));
    }

    const handleDeleteAuthor = async () => {
        try {
            const res = await fetch(`http://localhost:4000/author/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Beare ${user.accesToken}`
                }
            });

            if (res.status === 400 || res.status === 500) {
                const { message } = await res.json();
                setMessage(message);
            }

            if (res.ok) {
                const data = await res.json();
                deleteAuthor(data);

                navigate("/Authors");
            }
            
        } catch (err) {
            const error = `${err.name}: ${err.message}`
            setError(error);
        }
    }

  return (
    <div>
        {error && <h1>{error}</h1>}
        {message && <h1>{message}</h1>}

        <div>
            {isLoading ? <h1>Loading...</h1> : <div>{filteredAuthor && <h1>{filteredAuthor[0].name}</h1>}</div>}
            <div>
                    <Link to={`/edit-author/${id}`} onClick={handleAuthorEdit}>
                        <i className="fa-regular fa-pen-to-square"></i>
                    </Link>
                    <button onClick={handleDeleteAuthor}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
            </div>
        </div>

        {filteredAuthor && filteredAuthor.map(author => (
            <h1>{author.description}</h1>
        ))}
    </div>
  )
}
export default Author