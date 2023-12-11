import React, { useContext, useEffect } from "react";
import { FaCheckCircle, FaTrashAlt, FaInfoCircle } from "react-icons/fa";
import FeedbackContext from "../contexts/FeedbackProvider";

const Alert = ({ message, type }) => {
    const { showAlert, setShowAlert } = useContext(FeedbackContext);

    useEffect(() => {
        const exit = setTimeout(() => {
            setShowAlert(false);
        }, 2500);

        exit;

        return () => {
            clearTimeout(exit);
        };
    }, [showAlert]);

    const types = {
        success: "green",
        delete: "red",
        info: "blue",
    };

    const color = types[type];

    const containerStyle = `${
        showAlert ? "fixed" : "hidden"
    } bottom-5 left-10 z-[999]  flex w-auto items-center gap-4 rounded-lg bg-${color}-100 px-5 py-3 text-base text-${color}-900`;

    const iconStyle = `w-1/12 text-xl text-${color}-400`;

    return (
        <div className={containerStyle}>
            {type === "success" ? (
                <FaCheckCircle className={iconStyle} />
            ) : null}
            {type === "delete" ? <FaTrashAlt className={iconStyle} /> : null}
            {type === "info" ? <FaInfoCircle className={iconStyle} /> : null}

            <p className="w-11/12 whitespace-nowrap pr-1 text-base">
                {message}
            </p>
        </div>
    );
};

export default Alert;
