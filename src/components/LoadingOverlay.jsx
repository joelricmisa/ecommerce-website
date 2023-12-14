import React, { useContext } from "react";
import { FaSpinner } from "react-icons/fa";
import FeedbackContext from "../contexts/FeedbackProvider";

const LoadingOverlay = () => {
    const { showLoadingOverlay, loadingMessage } = useContext(FeedbackContext);
    return (
        <>
            <div
                className={`${
                    showLoadingOverlay ? "fixed" : "hidden"
                } grid-center left-0 top-0  z-[101] min-h-screen min-w-full bg-black/30 text-white`}
            ></div>

            <div
                className={`${
                    showLoadingOverlay ? "fixed" : "hidden"
                } flex-center  left-1/2 top-1/2 z-[102] max-w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-lg bg-gray-100 px-5 py-6 text-center  text-black`}
            >
                <div className="mx-auto flex items-center justify-center gap-4 text-xl">
                    <FaSpinner className="animate-spin text-2xl" />
                    {loadingMessage}
                </div>
            </div>
        </>
    );
};

export default LoadingOverlay;
