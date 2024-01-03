import { createContext, useReducer } from "react";

export const PublisherContext = createContext();

const publisherReducer = (state, {payload, type}) => {
    switch (type) {
        case "FETCH_PUBLISHERS":
            return {
                publishers: payload
            }
        case "ADD_PUBLISHER": 
            return {
                publishers: [payload, ...(state.publishers ?? [])]
            }
        case "EDIT_PUBLISHER": 
            return {
                publishers: [payload, ...(state.publishers ?? [])]
            }
        case "DELETE_PUBLISHER": 
            return {
                publishers: state.publishers.filter(publisher => publisher._id !== payload._id)
            }
        case "SET_PUBLISHERS_NAME":
            return {
                publishersName: payload
            }
        default:
            return state
    }
}

export const PublisherContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(publisherReducer, {
        publishers: null,
        publishersName: null
    })

    const fetchPublishers = (data) => {
        dispatch({type: "FETCH_PUBLISHERS", payload:data})
    }
    const fetchPublishersName = (data) => {
        dispatch({type: "SET_PUBLISHERS_NAME", payload:data})
    }

    const addPublisher = (data) => {
        dispatch({type: "ADD_PUBLISHER", payload:data})
    }

    const editPublisher = (data) => {
        dispatch({type: "EDIT_PUBLISHER", payload:data})
    }

    const deletePublisher = (data) => {
        dispatch({type: "DELETE_PUBLISHER", payload:data})
    }

    const value = {
        ...state,
        fetchPublishers,
        fetchPublishersName,
        addPublisher,
        editPublisher,
        deletePublisher
    }

    return (
        <PublisherContext.Provider value={value}>
            {children}
        </PublisherContext.Provider>
    )
}