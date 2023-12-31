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
                    <h1>{book.name}</h1>
                    <h2>{book.nickname}</h2>
                    <h2>{book.status}</h2>
                </div>

                <div>
                    <h1>{book.category.name}</h1>
                    <h1>{book.category.description}</h1>
                </div>

                <div>
                    <h1>{book.author.name}</h1>
                    <h1>{book.author.description}</h1>
                    <h1>{book.author.gender}</h1>
                    <h1>{book.author.dob}</h1>
                    <h1>{book.author.yod}</h1>
                    <h1>{book.author.position}</h1>
                </div>
                
                <div>
                    <h1>{book.publisher.name}</h1>
                    <h1>{book.publisher.address}</h1>
                    <h1>{book.publisher.country}</h1>
                    <h1>{book.publisher.email}</h1>
                    <h1>{book.publisher.phone}</h1>
                </div>
            </div>
        ))}

    {error && <h1>{error}</h1>}
    </div>
  )
}
export default Book