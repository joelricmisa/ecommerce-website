import { Link } from "react-router-dom";

const CategoryCard = ({ categoryName, categoryImage }) => {
	return (
		<Link to={""} className="border-2 border-black/30 rounded-sm hover:scale-105 hover:bg-tertiary hover:font-medium transition-transform py-7  ">
			<span className="grid-center gap-5">
				<img src={categoryImage} alt="" />
				{categoryName}
			</span>
		</Link>
	);
};

export default CategoryCard;
