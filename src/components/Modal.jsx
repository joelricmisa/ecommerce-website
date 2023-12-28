import React, { useContext } from "react";
import FeedbackContext from "../contexts/FeedbackProvider";
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";

const Modal = () => {
    const { showModal, setShowModal, modalMessage, type } =
        useContext(FeedbackContext);

    return (
        <>
            <div
                className={`${
                    showModal ? "fixed" : "hidden"
                } left-0 top-0 z-[99]  min-h-screen min-w-full bg-black/30 text-white`}
                onClick={() => setShowModal(false)}
            ></div>

            <div
                className={`${
                    showModal ? "fixed" : "hidden"
                } flex-center  left-1/2 top-1/2 z-[100] max-w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-lg bg-gray-100 px-5 py-6 text-center  text-black`}
            >
                {type === "success" && (
                    <FaCheckCircle className="text-5xl text-green-400" />
                )}

                {type === "error" && (
                    <FaInfoCircle className="text-5xl text-red-400" />
                )}

                {type === "info" && (
                    <FaInfoCircle className="text-5xl text-blue-400" />
                )}

                <p className=" text-lg font-normal tracking-wide  text-gray-950">
                    {modalMessage}
                </p>

                <button
                    className="button py-2"
                    onClick={() => setShowModal(false)}
                >
                    OK
                </button>
            </div>
        </>
    );
};

export default Modal;
