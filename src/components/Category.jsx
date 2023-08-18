import React from "react";
import { Link } from "react-router-dom";

const Category = ({ categoryName, categoryImage }) => {
	return (
		<Link
			to={""}
			className="grid border-2 border-black/30 place-items-center p-8 rounded-sm hover:scale-105 hover:bg-tertiary hover:font-medium transition-transform ">
			<img src={categoryImage} className="mb-5" alt="" />
			{categoryName}
		</Link>
	);
};

export default Category;
