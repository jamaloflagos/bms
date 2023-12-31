import { useState, useEffect } from "react";
import { useBook } from "../hooks/useBook";
import { useUser } from "../hooks/useUser";
import Books from "../components/Books";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import Search from "../components/Search";

const Main = () => {
    const { user } = useUser();
    const { books, dispatch } = useBook();
    const [error, setError] = useState("");
    const [searchItem, setSearchItem] = useState("");
    const [isLoading, setIsloading] = useState(true);
    const [isError, setIsError] = useState(false);
    // const [isBook, setIsBook] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);
    const lastIndex = currentPage * booksPerPage;
    const firstIndex = lastIndex - booksPerPage;
    const currentBooks = books ? books.filter(item => {
        const search = searchItem.toLowerCase()
        return search === "" ? item : 
        item.author.name.toLowerCase().includes(search) || 
        item.name.toLowerCase().includes(search) || 
        item.publisher.name.toLowerCase().includes(search) || 
        item.category.name.toLowerCase().includes(search)
    }).slice(firstIndex, lastIndex) : books

    const paginate = (number) => {
        setCurrentPage(number);
    }
    console.log("main rendered");
    console.log(books);
       console.log(currentBooks);
       
    const onChange = (e) => {
        setSearchItem(e.target.value);
        // if(currentBooks.length === 0) {
        //     setIsBook(true)
        // } else {
        //     setIsBook(false)
        // }
    }

    const fetchBook = async() => {
        
        try {
            const res = await fetch('https://bms-server-ashy.vercel.app/book', {
                headers: {
                   "Authorization": `Bearer ${user.accessToken}`
                }
            })
            
            if(!res.ok) {
                const error = await res.json();
                throw new Error(`Server error: ${error.message}`)
            }

            const data = await res.json();
            dispatch({type: "FETCH_BOOKS", payload: data});
            setIsloading(false);
            console.log(books);
            console.log(currentBooks);      
            
        } catch (error) {
            setIsError(true);
            setError(error.message)
            setIsloading(false);
            console.error(error.message)
            console.log("error:", isError);
        }

       } 

    useEffect(() => {
        
        if(user) {
            fetchBook()
        }
        
        if(!user) {
            setError("Please login")
        }
        
    }, []);
    

    if(isLoading) {
        return <h1>Loading books...</h1>
    }

    if(isError) {
        return <h2>{error}</h2>
    }


  return (
    <>
        <div className="nav">
            <h1>Books</h1>
            <Link to="add-book">Add Book!</Link>    
        </div>
        <Search onChange={onChange}/>
        {currentBooks.length > 0 && <Books books={currentBooks} />}
        {currentBooks.length === 0 && <h1>No Books Found</h1>}
        {error && <h1>{error}</h1>}
        {currentBooks.length > 0 && <Pagination totalBook={books} booksPerPage={booksPerPage} paginate={paginate} setCurrentPage={setCurrentPage} currentPage={currentPage}/>}
    </>
  )
}
export default Main