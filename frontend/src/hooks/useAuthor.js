import { useContext } from "react";
import { AuthorContext } from "../contexts/authorContext";

export const useAuthor = () => {
    const context = useContext(AuthorContext);

    if(!context) {
        throw Error("Must be used within context")
    }

    return context;
} 