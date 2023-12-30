import React from "react";
import { FaSpinner } from "react-icons/fa";

const LoadingOverlay = ({ message }) => {
    return (
        <>
            <div
                className={`grid-center fixed left-0 top-0  z-[101] min-h-screen min-w-full bg-black/30 text-white`}
            ></div>

            <div
                className={`flex-center fixed  left-1/2 top-1/2 z-[102] max-w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-lg bg-gray-100 px-5 py-6 text-center  text-black`}
            >
                <div className="mx-auto flex items-center justify-center gap-4 text-xl">
                    <FaSpinner className="animate-spin text-2xl" />
                    {message}
                </div>
            </div>
        </>
    );
};

export default LoadingOverlay;
