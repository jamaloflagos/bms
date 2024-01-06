import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { usePublisher } from "../../hooks/usePublisher";
import { useUser } from "../../hooks/useUser";
import Publishers from "./Publishers";

const PublishersContainer = () => {
    const [message, setMessage] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const {publishers, fetchPublishers} = usePublisher();
    const { user } = useUser()

    const fetchPublisher = async () => {
        try {
            const res = await fetch("https://bms-server-ashy.vercel.app/publisher",  {
                headers: {
                   "Authorization": `Bearer ${user.accessToken}`
                }
            });

            if (res.status === 204) {
                setLoading(false);
                setMessage("No author found");
            }

            if (res.ok && res.status !== 204) {
                const data = await res.json();
                fetchPublishers(data);

                setLoading(false);
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

            setLoading(false);
        }
    }

    useEffect(() => {
        if(user) {
            fetchPublisher()
        }

    }, [user]);

  return (
    <div>
        {isLoading && <h1>Fetching publishers...</h1>}
        {message && <h1>{`${message}, click on the plus icon below to add one`}</h1>}
        {error && <h1>{error}</h1>}

        <div>
            {publishers && <span>Publisherss</span>}
        </div>

        <div>
            {publishers && publishers.map(publisher => (
                <Publishers 
                    key={publisher._id}
                    id={publisher._id}
                    name={publisher.name}
                    address={publisher.address}
                    country={publisher.country}
                    phone={publisher.phone}
                    email={publisher.email}
                />
            ))}
        </div>

        <Link to="/add-publisher" className="add">
            <i className="fa-solid fa-plus fa-xm" style={{color: "#ffffff"}}></i>
        </Link>
    </div>
  )
}
export default PublishersContainer