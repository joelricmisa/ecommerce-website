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

    const boxVariants = {
        success: "text-green-900 bg-green-100",
        delete: "text-red-900 bg-red-100",
        info: "text-blue-900 bg-blue-100",
    };

    const iconVariants = {
        success: "text-green-400",
        delete: "text-red-400",
        info: "text-blue-400",
    };

    const containerStyle = `${
        showAlert ? "fixed" : "hidden"
    } bottom-5 sm:left-10 left-4  z-[999]  flex w-11/12 sm:w-auto items-center justify-center gap-4 rounded-lg px-5  py-3 text-base ${
        boxVariants[type]
    }`;

    const iconStyle = `sm:w-1/12 text-xl  ${iconVariants[type]}`;

    return (
        <div className={containerStyle}>
            {type === "success" && <FaCheckCircle className={iconStyle} />}
            {type === "delete" && <FaTrashAlt className={iconStyle} />}
            {type === "info" && <FaInfoCircle className={iconStyle} />}

            <p className=" text-sm sm:w-11/12 sm:whitespace-nowrap sm:pr-5 sm:text-base ">
                {message}
            </p>
        </div>
    );
};

export default Alert;
