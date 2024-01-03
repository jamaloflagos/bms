import { useEffect, useState } from "react"
import { usePublisher } from "../../hooks/usePublisher";
import { useParams } from "react-router-dom";

const Publisher = () => {
    const { id } = useParams();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [filteredPublisher, setFilteredPublisher] = useState(null);
    const [publishers] = usePublisher();

    const fetchPublisher = async () => {
        try {
            const res = await fetch(`http://localhost:4000/publisher/${id}`);

            if (res.status === 204 || res.status === 400) {
                const { message } = await res.json();
                setMessage(message);
                setLoading(false);
            }

            if (res.ok && res.status !== 204) {
                const data = await res.json();

                setFilteredPublisher(publishers && publishers.filter(publisher => publisher._id === data._id));
                setLoading(false);
            }
        } catch (err) {
            const error = `${err.name}: ${err.message}`
            setError(error);  
        }
    }

    useEffect(() => {
        fetchPublisher()
    }, [])

  return (
    <div>
        {error && <h1>{error}</h1>}
        {message && <h1>{message}</h1>}

        <div>
            {isLoading ? <h1>Loading...</h1> : <div>{filteredPublisher && <h1>{filteredPublisher[0].name}</h1>}</div>}
        </div>

        {filteredPublisher && filteredPublisher.map(publisher => (
            <h1>{publisher.name}</h1>
        ))}
    </div>
  )
}
export default Publisher