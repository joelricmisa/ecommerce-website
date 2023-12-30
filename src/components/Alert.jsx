import React, { useEffect } from "react";
import { FaCheckCircle, FaTrashAlt, FaInfoCircle } from "react-icons/fa";

const Alert = ({ message, variant, closeFnc }) => {
    useEffect(() => {
        const exit = setTimeout(() => {
            closeFnc();
        }, 2500);

        exit;

        return () => {
            clearTimeout(exit);
        };
    }, [variant]);

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

    const containerStyle = `fixed bottom-5 sm:left-10 left-4  z-[999]  flex w-11/12 sm:w-auto items-center justify-center gap-4 rounded-lg px-5  py-3 text-base ${boxVariants[variant]}`;

    const iconStyle = `sm:w-1/12 text-xl  ${iconVariants[variant]}`;

    return (
        <div className={containerStyle}>
            {variant === "success" && <FaCheckCircle className={iconStyle} />}
            {variant === "delete" && <FaTrashAlt className={iconStyle} />}
            {variant === "info" && <FaInfoCircle className={iconStyle} />}

            <p className=" text-sm sm:w-11/12 sm:whitespace-nowrap sm:pr-5 sm:text-base ">
                {message}
            </p>
        </div>
    );
};

export default Alert;
