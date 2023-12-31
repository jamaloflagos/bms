import { createContext, useReducer } from "react"

export const BookContext = createContext();

const bookReducer = (state, action) => {
    switch(action.type) {
        case "FETCH_BOOKS": 
            return {
                books: action.payload
            }
        case "SEARCH_BOOKS": 
            return {
                books: action.payload
            }
        case "DELETE_BOOK":
            return {
                books: state.books.filter(book => book._id !== action.payload._id)
            }
        case "ADD_BOOK":
            return {
                books: [action.payload, ...state.books]
            }
        default: return state
    }
}

export const BookContextProvider = ({children}) => {
    const [ state, dispatch ] = useReducer(bookReducer, {
        books: null
    })
    
    return (
        <BookContext.Provider value = {{...state, dispatch}}>
            {children}
        </BookContext.Provider>
    )
}
