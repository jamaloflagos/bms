import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

export const useUser = () => {
    const context = useContext(UserContext);

    if(!context) {
        throw Error("Must be used within its context");
    }

    return context;
}