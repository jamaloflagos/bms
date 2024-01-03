import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import { useUser } from "./hooks/useUser";
import AddBook from './pages/book/AddBook';
import Book from './pages/book/Book';
import Login from "./pages/Login";
import BooksContainer from "./pages/book/BooksContainer";
import Error404 from "./pages/Error404";
import { useEffect } from "react";
import Author from "./pages/author/Author";
import AddAuthor from "./pages/author/AddAuthor";
import Publisher from "./pages/publisher/Publisher";
import AddPublisher from "./pages/publisher/AddPublisher";
import AuthorsContainer from "./pages/author/AuthorsContainer";
import PublishersContainer from "./pages/publisher/PublishersContainer";

function App() {
  const { user, dispatch } = useUser();
  console.log(user);
  
  // useEffect(() => {
  //   const fetchAuthorsName = async () => {
  //     try {
  //       const res = await fetch("http://localhost:4000/author/names", {
  //         headers: {
  //            "Authorization": `Bearer ${user.accessToken}`
  //         }
  //     });
        
  //       if (res.status === 204) throw Error("No Author");

  //       if (res.ok && res.status !== 204) {
  //         const data = await res.json();
  //         console.log(data);
          
  //         localStorage.setItem("authorsName", JSON.stringify(data));
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   if (user) {
  //     fetchAuthorsName();
  //   }
  // }, [])

  // useEffect(() => {
  //   const fetchPublishersName = async () => {
  //     try {
  //       const res = await fetch("http://localhost:4000/publisher/names", {
  //         headers: {
  //            "Authorization": `Bearer ${user.accessToken}`
  //         }
  //     });
        
  //       if (res.status === 204) throw Error("No Publisher");

  //       if (res.ok && res.status !== 204) {
  //         const data = await res.json();
  //         console.log(data);
  //         localStorage.setItem("publishersName", JSON.stringify(data));
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   if (user) {
  //     fetchPublishersName();
  //   }

  // }, [])

  useEffect(() => {
    const logout = setTimeout(() => {
      localStorage.removeItem("user")
      dispatch({type: "LOGOUT"})
  }, 1000 * 60 * 60);

  return () => clearTimeout(logout);
  }, [])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={user ? <BooksContainer /> : <Navigate to="login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/:id" element={<Book />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/authors" element={<AuthorsContainer />} />
          <Route path="/:id" element={<Author />} />
          <Route path="add-author" element={<AddAuthor />} />
          <Route path="publishers" element={<PublishersContainer />} />
          <Route path="/:id" element={<Publisher />} />
          <Route path="add-publisher" element={<AddPublisher />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
