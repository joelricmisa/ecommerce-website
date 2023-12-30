import { useContext } from "react";
import FeedbackContext from "../contexts/FeedbackProvider";

const useFeedback = () => {
    const { setIsShow, setComponent, setMessage, setVariant } =
        useContext(FeedbackContext);

    const showFeedback = (type, message, component) => {
        setIsShow(true);
        setMessage(message);
        setComponent(component);
        setVariant(type);
    };

    return showFeedback;
};

export default useFeedback;
