import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";

const CategoryCard = ({ categoryName, categoryImage }) => {
  const { setCategory } = useContext(ShopContext);
  return (
    <Link
      to={"/products"}
      className="rounded-sm border-2 border-black/30 py-7 transition-transform hover:scale-105 hover:bg-extraColor hover:font-medium "
      onClick={() => setCategory(categoryName)}
    >
      <span className="grid-center gap-5">
        <img src={categoryImage} alt="" />
        {categoryName}
      </span>
    </Link>
  );
};

export default CategoryCard;
