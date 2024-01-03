import { useEffect, useState } from "react"
import { useAuthor } from "../../hooks/useAuthor";
import { useParams } from "react-router-dom";

const Author = () => {
    const { id } = useParams();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [filteredAuthor, setFilteredAuthor] = useState(null);
    const [authors] = useAuthor();

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

  return (
    <div>
        {error && <h1>{error}</h1>}
        {message && <h1>{message}</h1>}

        <div>
            {isLoading ? <h1>Loading...</h1> : <div>{filteredAuthor && <h1>{filteredAuthor[0].name}</h1>}</div>}
        </div>

        {filteredAuthor && filteredAuthor.map(author => (
            <h1>{author.description}</h1>
        ))}
    </div>
  )
}
export default Author