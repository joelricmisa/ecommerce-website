import React, { createContext, useState } from "react";
import { Alert, Modal, LoadingOverlay } from "../components";

const FeedbackContext = createContext({});

export const FeedbackProvider = ({ children }) => {
    const [isShow, setIsShow] = useState(false);
    const [component, setComponent] = useState("");
    const [message, setMessage] = useState("");
    const [variant, setVariant] = useState("");

    const contextValue = {
        isShow,
        setIsShow,
        component,
        setComponent,
        message,
        setMessage,
        variant,
        setVariant,
    };

    return (
        <FeedbackContext.Provider value={contextValue}>
            {children}

            {isShow && component === "alert" && (
                <Alert
                    message={message}
                    variant={variant}
                    closeFnc={() => setIsShow(false)}
                />
            )}

            {isShow && component === "modal" && (
                <Modal
                    message={message}
                    variant={variant}
                    closeFnc={() => setIsShow(false)}
                />
            )}

            {isShow && component === "overlay" && (
                <LoadingOverlay message={message} />
            )}
        </FeedbackContext.Provider>
    );
};

export default FeedbackContext;
