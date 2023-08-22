import { Link } from "react-router-dom";

const CategoryCard = ({ categoryName, categoryImage }) => {
	return (
		<Link to={""} className="border-2 border-black/30 rounded-sm hover:scale-105 hover:bg-tertiary hover:font-medium transition-transform p-5 ">
			<span className="grid place-items-center">
				<img src={categoryImage} className="mb-5" alt="" />
				{categoryName}
			</span>
		</Link>
	);
};

export default CategoryCard;
