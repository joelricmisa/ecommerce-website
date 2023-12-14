import React, { createContext, useState } from "react";
import Alert from "../components/Alert";
import Modal from "../components/Modal";
import LoadingOverlay from "../components/LoadingOverlay";

const FeedbackContext = createContext({});

export const FeedbackProvider = ({ children }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");

    return (
        <FeedbackContext.Provider
            value={{
                showAlert,
                setShowAlert,
                message,
                setMessage,
                type,
                setType,
                showModal,
                setShowModal,
                modalMessage,
                setModalMessage,
                showLoadingOverlay,
                setShowLoadingOverlay,
                loadingMessage,
                setLoadingMessage,
            }}
        >
            {children}

            {type === "success" ? (
                <Alert message={message} type="success" />
            ) : null}

            {type === "delete" ? (
                <Alert message={message} type="delete" />
            ) : null}

            {type === "info" ? <Alert message={message} type="info" /> : null}

            <Modal />

            <LoadingOverlay />
        </FeedbackContext.Provider>
    );
};

export default FeedbackContext;
