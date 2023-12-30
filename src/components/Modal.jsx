import React from "react";

import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";

const Modal = ({ message, variant, closeFnc }) => {
    return (
        <>
            <div
                className={`fixed left-0 top-0 z-[99]  min-h-screen min-w-full bg-black/30 text-white`}
                onClick={closeFnc}
            ></div>

            <div
                className={`flex-center fixed  left-1/2 top-1/2 z-[100] max-w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-lg bg-gray-100 px-5 py-6 text-center  text-black`}
            >
                {variant === "success" && (
                    <FaCheckCircle className="text-5xl text-green-400" />
                )}

                {variant === "error" && (
                    <FaInfoCircle className="text-5xl text-red-400" />
                )}

                {variant === "info" && (
                    <FaInfoCircle className="text-5xl text-blue-400" />
                )}

                <p className=" text-lg font-normal tracking-wide  text-gray-950">
                    {message}
                </p>

                <button className="button py-2" onClick={closeFnc}>
                    OK
                </button>
            </div>
        </>
    );
};

export default Modal;
