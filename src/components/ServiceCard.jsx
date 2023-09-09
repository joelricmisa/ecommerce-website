import React from "react";

const ServiceCard = ({ serviceImg, serviceTitle, serviceDescription }) => {
	return (
		<div className="flex-col p-5 py-16 text-center flex-center ">
			<img
				src={serviceImg}
				className="mb-4"
				alt=""
			/>
			<h2 className="text-xl font-bold">{serviceTitle}</h2>
			<p className="text-sm">{serviceDescription}</p>
		</div>
	);
};

export default ServiceCard;
