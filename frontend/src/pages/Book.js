import { useEffect, useState } from "react";
import { useBook } from "../hooks/useBook";
import { useUser } from "../hooks/useUser";
import { useParams } from "react-router-dom";

const Book = () => {
    const { id } = useParams();

    const { user } = useUser();
    const {books, dispatch} = useBook(); 

    const [error, setError] = useState("");
    const [filteredBook, setFilteredBook] = useState(null);
    console.log("Single book component rendered");
    
    console.log("param", id);
    
    useEffect( () => {
        const getSinglBook = async() => {
            console.log("get singlenogte function called");
            

            
            try {
                const res = await fetch(`https://bms-server-ashy.vercel.app/book/${id}`, {
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
            getSinglBook();
        }
        
        if(!user) {
            setError("User not authenticated");
            console.log("here");
            
        }

    }, [user, dispatch, id, books])
    console.log(filteredBook); 

  return (
    <div>
        {filteredBook && filteredBook.map(book => (
            <div key={book._id}>
                <div>
                    <h4>Book details</h4>
                    <span>{book.name}</span>
                    <span>{book.nickname}</span>
                    <span>{book.status}</span>
                </div>

                <div>
                    <h4>Book category details</h4>
                    <span>{book.category.name}</span>
                    <span>{book.category.description}</span>
                </div>

                <div>
                    <h4>Author details</h4>
                    <span>{book.author.name}</span>
                    <span>{book.author.description}</span>
                    <span>{book.author.gender}</span>
                    <span>{book.author.dob}</span>
                    <span>{book.author.yod}</span>
                    <span>{book.author.position}</span>
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