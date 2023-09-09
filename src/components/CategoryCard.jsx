import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";

const CategoryCard = ({ categoryName, categoryImage }) => {
	const { setCategory } = useContext(ShopContext);
	return (
		<Link
			to={"/products"}
			className="transition-transform border-2 rounded-sm border-black/30 hover:scale-105 hover:bg-extraColor hover:font-medium py-7 "
			onClick={() => setCategory(categoryName)}>
			<span className="gap-5 grid-center">
				<img
					src={categoryImage}
					alt=""
				/>
				{categoryName}
			</span>
		</Link>
	);
};

export default CategoryCard;
