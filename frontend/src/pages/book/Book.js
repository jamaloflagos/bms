import { useEffect, useState } from "react";
import { useBook } from "../../hooks/useBook";
import { useUser } from "../../hooks/useUser";
import { useParams, Link, useNavigate } from "react-router-dom";

const Book = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useUser();
    const {books, dispatch} = useBook(); 

    const [error, setError] = useState("");
    const [filteredBook, setFilteredBook] = useState(null);
    
    useEffect( () => {
        const getSingleBook = async() => {
            console.log("get singlenogte function called");
            

            
            try {
                const res = await fetch(`http://localhost:4000/book/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${user.accessToken}`
                    }
                })
    
                if(res.ok) {
                    const data = await res.json();                
                    setFilteredBook(books && books.filter(book => book._id === data._id));    
                }
                
                if(!res.ok) {
                    const error = await res.json();
                    setError(error.message);    
                }
                
            } catch (error) {
                console.log(error);
            }
            
        }
        
        if(user) {
            getSingleBook();
        }
        
        if(!user) {
            setError("User not authenticated");
            console.log("here");
            
        }

    }, [user, dispatch, id, books]);

    const handleBookEdit = () => {
        localStorage.setItem("singleBook", JSON.stringify(...filteredBook));
    }

    const deleteBook = async () => {
        try {
            const res = await fetch(`http://localhost:4000/book/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${user.accessToken}`
                }
            })

            if (res.status === 400 || res.status === 500) {
                const { message } = await res.json();
                setError(message)
            }

            if (res.ok) {
                const data = await res.json();
                dispatch({type: "DELETE_BOOK", payload: data});

                navigate("/");
            }
            
        } catch (err) {
            const error = `${err.name}: ${err.message}`
            setError(error);
        }
    }
  return (
    <div>
        <div>
            <div>
                {filteredBook && <h1>{filteredBook[0].name}</h1>}
            </div>
            
            <div>
                    <Link to={`/edit-book/${id}`} onClick={handleBookEdit}>
                        <i className="fa-regular fa-pen-to-square"></i>
                    </Link>
                    <button onClick={deleteBook}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
            </div>
            </div>
        {filteredBook && filteredBook.map(book => (
            <div key={book._id}>
                <div>
                    <h4>Book details</h4>
                    <span>{book.name}</span>
                    <span>{book.nickname}</span>
                    <span>{book.status}</span>
                    <hr />
                </div>


                <div>
                    <h4>Author details</h4>
                    <span>{book.author.name}</span>
                    <span>{book.author.description}</span>
                    <span>{book.author.gender}</span>
                    <span>{book.author.dob}</span>
                    <span>{book.author.yod}</span>
                    <span>{book.author.position}</span>
                    <hr />
                </div>
                
                <div>
                    <h4>Publisher details</h4>
                    <span>{book.publisher.name}</span>
                    <span>{book.publisher.address}</span>
                    <span>{book.publisher.country}</span>
                    <span>{book.publisher.email}</span>
                    <span>{book.publisher.phone}</span>
                </div>
            </div>
        ))}

    {error && <span>{error}</span>}
    </div>
  )
}
export default Book