import React from "react";
import { Link } from "react-router-dom";

const NewArrivalCardText = ({ title, description }) => {
	return (
		<span className="bottom-0 left-0 absolute p-5 flex flex-col justify-end gap-2 bg-secondary/30 h-full w-full">
			<h1 className="text-2xl font-semibold">{title}</h1>
			<p className="text-sm w-1/2">{description}</p>
			<Link className="link">Shop Now</Link>
		</span>
	);
};

export default NewArrivalCardText;
