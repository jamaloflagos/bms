import { createContext, useReducer } from "react";

export const AuthorContext = createContext();

const authorReducer = (state, {payload, type}) => {
    switch (type) {
        case "FETCH_AUTHORS":
            return {
                authors: payload
            }
        case "ADD_AUTHOR": 
            return {
                authors: [payload, ...(state.books ?? [])]
            }
        case "EDIT_AUTHOR": 
            return {
                authors: [payload, ...(state.books ?? [])]
            }
        case "DELETE_AUTHOR": 
            return {
                authors: state.authors.filter(author => author._id !== payload._id)
            }
        case "SET_AUTHORS_NAME": 
            return {
                authorsName: payload
            }
        default:
            return state
    }
}


export const AuthorContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authorReducer, {
        authors: null,
        authorsName: null
    })

    const addAuthor = (data) => {
        dispatch({type: "ADD_AUTHOR", payload: data})
    }
    const fetchAuthors = (data) => {
        dispatch({type: "FETCH_AUTHORS", payload: data})
    }
    const fetchAuthorsName = (data) => {
        dispatch({type: "SET_AUTHORS_NAME", payload: data})
    }
    const editAuthor = (data) => {
        dispatch({type: "EDIT_AUTHOR", payload: data})
    }
    const deleteAuthor = (data) => {
        dispatch({type: "DELETE_AUTHOR", payload: data})
    }
    
    const value = {
        ...state,
        addAuthor,
        fetchAuthors,
        fetchAuthorsName,
        editAuthor,
        deleteAuthor
    }

    return (
        <AuthorContext.Provider value={value}>
            {children}
        </AuthorContext.Provider>
    )
}