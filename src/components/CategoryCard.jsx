import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";

const CategoryCard = ({ categoryName, categoryImage }) => {
    const { setCategory } = useContext(ShopContext);
    const linkStyle = `cursor-pointer rounded-sm border-2 border-black/30 py-7 transition-transform hover:scale-105 hover:bg-extraColor hover:font-medium`;

    return (
        <Link
            to={"/products"}
            className={linkStyle}
            onClick={() => setCategory(categoryName)}
        >
            <span className="grid-center gap-5">
                {categoryImage} {categoryName}
            </span>
        </Link>
    );
};

export default CategoryCard;
