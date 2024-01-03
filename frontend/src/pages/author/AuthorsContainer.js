import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useAuthor } from "../../hooks/useAuthor";
import { useUser } from "../../hooks/useUser";
import Authors from "./Authors";

const AuthorsContainer = () => {
    const [message, setMessage] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const {authors, fetchAuthors} = useAuthor();
    const { user } = useUser();
    console.log(user);
    

    const fetchAuthor = async () => {
        try {
            const res = await fetch("http://localhost:4000/author", {
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
                fetchAuthors(data);

                setLoading(false);
            }
            
        } catch (err) {
            const error = `${err.name}: ${err.message}`
            setError(error);

            setLoading(false);
        }
    }

    useEffect(() => {    
        console.log(user);
            
        if(user) {
            fetchAuthor()
        }

    }, [user]);

  return (
    <div>
        {isLoading && <h1>Fetching authors...</h1>}
        {message && <h1>{`${message}, click on the plus icon below to add one`}</h1>}
        {error && <h1>{error}</h1>}

        <div>
            {authors && <span>Authors</span>}
        </div>

        <div>
            {authors && authors.map(author => (
                <Authors 
                    key={author._id}
                    id={author._id}
                    name={author.name}
                    description={author.description}
                    gender={author.gender}
                    dob={author.dob}
                    yod={author.yod}
                    position={author.position} 
                />
            ))}
        </div>

        <Link to="/add-author" className="add">
            <i className="fa-solid fa-plus fa-xm" style={{color: "#ffffff"}}></i>
        </Link>
    </div>
  )
}
export default AuthorsContainer