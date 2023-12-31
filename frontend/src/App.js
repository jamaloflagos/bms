import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import { useUser } from "./hooks/useUser";
import AddBook from './pages/AddBook';
import Book from './pages/Book';
import Login from "./pages/Login";
import Main from "./pages/Main";
import Error404 from "./pages/Error404";
import { useEffect } from "react";

function App() {
  const { user, dispatch } = useUser();
  console.log(user);
  
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
          <Route path="/" element={user ? <Main /> : <Navigate to="login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          {/* <Route path="/" element={<Main />} /> */}
          <Route path="/:id" element={<Book />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
