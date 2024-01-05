import { useEffect, useState } from "react"
import { usePublisher } from "../../hooks/usePublisher";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

const Publisher = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useUser()
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [filteredPublisher, setFilteredPublisher] = useState(null);
    const { publishers, deletePublisher} = usePublisher();
    const fetchPublisher = async () => {
        try {
            const res = await fetch(`http://localhost:4000/publisher/${id}`, {
                headers: {
                    "Authorization": `Bearer ${user.accessToken}`
                }
            });

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
        if (user) {
            fetchPublisher();
        }
    }, [user])

    const handlePublisherEdit = () => {
        localStorage.setItem("singlePublisher", JSON.stringify(...filteredPublisher));
    }

    const handleDeletePublisher = async () => {
        try {
            const res = await fetch(`http://localhost:4000/publisher/${id}`, {
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
                deletePublisher(data);

                navigate("/publishers");
            }

            if (res.status === 401) {
                setLoading(false);
                throw new Error("Unauthorized, please login");;
            }
            
            if (res.status === 403) {
                setLoading(false);
                throw Error("Forbidden request, please login");
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

        <div style={{display: "flex", justifyContent: "space-between"}}>
            {isLoading ? <h1>Loading...</h1> : <div>{filteredPublisher && <h1>{filteredPublisher[0].name}</h1>}</div>}
            <div>
                    <Link to={`/edit-publisher/${id}`} onClick={handlePublisherEdit}>
                        <i className="fa-regular fa-pen-to-square"></i>
                    </Link>
                    <button onClick={handleDeletePublisher}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
            </div>
        </div>

        {filteredPublisher && filteredPublisher.map(publisher => (
            <h1>{publisher.name}</h1>
        ))}
    </div>
  )
}
export default Publisher