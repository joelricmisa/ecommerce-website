import React, { createContext, useState } from "react";
import Alert from "../components/Alert";

const FeedbackContext = createContext({});

export const FeedbackProvider = ({ children }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");

    return (
        <FeedbackContext.Provider
            value={{ showAlert, setShowAlert, message, setMessage, setType }}
        >
            {children}

            {type === "success" ? (
                <Alert message={message} showAlert={showAlert} type="success" />
            ) : null}

            {type === "delete" ? (
                <Alert message={message} showAlert={showAlert} type="delete" />
            ) : null}

            {type === "info" ? (
                <Alert message={message} showAlert={showAlert} type="info" />
            ) : null}
        </FeedbackContext.Provider>
    );
};

export default FeedbackContext;
