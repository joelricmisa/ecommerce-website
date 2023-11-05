import React from "react";

const ServiceCard = ({ serviceImg, serviceTitle, serviceDescription }) => {
    return (
        <div className="flex-center flex-col gap-8 p-5 py-16 text-center ">
            <span className="grid-center h-20 w-20 bg-icon">{serviceImg}</span>
            <h2 className="text-xl font-bold">{serviceTitle}</h2>
            <p className="text-sm">{serviceDescription}</p>
        </div>
    );
};

export default ServiceCard;
