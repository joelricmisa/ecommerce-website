import React from "react";

const ServiceCard = ({ serviceImg, serviceTitle, serviceDescription }) => {
	return (
		<div className="flex-center flex-col p-5 py-16 ">
			<img src={serviceImg} className="mb-4" alt="" />
			<h2 className="font-bold text-xl">{serviceTitle}</h2>
			<p className="text-sm">{serviceDescription}</p>
		</div>
	);
};

export default ServiceCard;
