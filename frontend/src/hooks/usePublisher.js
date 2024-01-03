import { useContext } from "react";
import { PublisherContext } from "../contexts/publisherContext";

export const usePublisher = () => {
    const context = useContext(PublisherContext);

    if(!context) {
        throw Error("Must be used within context")
    }

    return context;
} 