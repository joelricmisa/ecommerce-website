import { useContext } from "react";
import FeedbackContext from "../contexts/FeedbackProvider";

const useFeedback = () => {
    const { setMessage, setShowAlert, setType, setModalMessage, setShowModal } =
        useContext(FeedbackContext);

    const showFeedback = (type, message, component) => {
        setType(type);

        if (component === "alert") {
            setShowAlert(true);
            setMessage(message);
        } else {
            setShowModal(true);
            setModalMessage(message);
        }
    };

    return showFeedback;
};

export default useFeedback;
