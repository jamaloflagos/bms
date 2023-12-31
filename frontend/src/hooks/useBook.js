import { useContext } from "react";
import { BookContext } from "../contexts/bookContext";

export const useBook = () => {
    const context = useContext(BookContext);

    if(!context) {
        throw Error("Must be used within context")
    }

    return context;
} 