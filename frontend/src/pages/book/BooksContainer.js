import { useState, useEffect } from "react";
import { useBook } from "../../hooks/useBook";
import { useUser } from "../../hooks/useUser";
import Books from "./Books";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import { useAuthor } from "../../hooks/useAuthor";
import { usePublisher } from "../../hooks/usePublisher";

const BooksContainer = () => {
    const { user } = useUser();
    const { fetchAuthorsName } = useAuthor();
    const { fetchPublishersName } = usePublisher();
    const { books, dispatch } = useBook();
    const [error, setError] = useState("");
    const [searchItem, setSearchItem] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);
    const lastIndex = currentPage * booksPerPage;
    const firstIndex = lastIndex - booksPerPage;
    const currentBooks = books ? books.filter(item => {
        const search = searchItem.toLowerCase()
        return search === "" ? item : 
        item.author.name.toLowerCase().includes(search) || 
        item.name.toLowerCase().includes(search) || 
        item.publisher.name.toLowerCase().includes(search)
    }).slice(firstIndex, lastIndex) : (books ?? [])

    const paginate = (number) => {
        setCurrentPage(number);
    }
       
    const onChange = (e) => {
        setSearchItem(e.target.value);
    }

    const resetSearch = () => {
      console.log("clicked");
      
      setSearchItem("");
    }

    const fetchBook = async() => {
        try {
            const res = await fetch('https://bms-server-ashy.vercel.app/book', {
                headers: {
                   "Authorization": `Bearer ${user.accessToken}`
                }
            })
            
            if (res.status === 204) {
                setLoading(false);
                setMessage("No book found");
            }
            
            if (res.ok && res.status !== 204) {
                const data = await res.json();
                dispatch({type: "FETCH_BOOKS", payload: data});

                setLoading(false);
                setMessage("");
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
       
       const fetchAuthorsNames = async () => {
        try {
          const res = await fetch("https://bms-server-ashy.vercel.app/author/names", {
            headers: {
               "Authorization": `Bearer ${user.accessToken}`
            }
        });
          
          if (res.status === 204) throw Error("No Author");
  
          if (res.ok && res.status !== 204) {
            const data = await res.json();
            fetchAuthorsName(data);

            if (res.status === 401) {
              setLoading(false);
              throw new Error("Unauthorized, please login");;
            }
            if (res.status === 403) {
              setLoading(false);
              throw Error("Forbidden request, please login");
            }
          }
        } catch (error) {
          console.log(error);
        }
      }

      const fetchPublishersNames = async () => {
        try {
          const res = await fetch("https://bms-server-ashy.vercel.app/publisher/names", {
            headers: {
               "Authorization": `Bearer ${user.accessToken}`
            }
        });
          
          if (res.status === 204) throw Error("No Publisher");
  
          if (res.ok && res.status !== 204) {
            const data = await res.json();
            fetchPublishersName(data)
          }

          if (res.status === 401) {
            setLoading(false);
            throw new Error("Unauthorized, please login");;
          }
          
          if (res.status === 403) {
            setLoading(false);
            throw Error("Forbidden request, please login");
          }
        } catch (error) {
          console.log(error);
        }
      }

    useEffect(() => {
        
        if(user) {
            fetchBook();
            fetchAuthorsNames();
            fetchPublishersNames();
        }
        
    }, [user]);


  return (
    <>
        {isLoading && <h1>Fetching books...</h1>}
        {message && <h1>{`${message}, click on the plus icon below to add one`}</h1>}

        <div style={{display: "flex", gap: "50px"}}>
            {books && <span>Books</span>}

            <div>
              <nav>
                <ul style={{margin: "0", padding: "0"}}>
                  <li>
                    <Link to="/authors">Authors</Link>
                  </li>
                  <li>
                    <Link to="/publishers">Publishers</Link>
                  </li>
                </ul>
              </nav>
            </div>
        </div>

        <Search onChange={onChange} const resetSearch={resetSearch}/>

        {currentBooks && <Books books={currentBooks} />}
        {currentBooks.length > 0 && <Pagination totalBook={books} booksPerPage={booksPerPage} paginate={paginate} setCurrentPage={setCurrentPage} currentPage={currentPage}/>}

        {error && <h1>{error}</h1>}
        <Link to="/add-book" className="add">
            <i className="fa-solid fa-plus fa-xm" style={{color: "#ffffff"}}></i>
        </Link>
    </>
  )
}
export default BooksContainer