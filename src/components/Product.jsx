import { useState } from "react";

import { SvgIcon } from "./index";
import { heart, eye } from "../assets/icons/SvgIconsList";
import { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";

const Product = ({ id, productName, productImage, currentPrice, originalPrice, rating, rateCount, discountPercentage, quantity, subTotal }) => {
	const [toggle, setToggle] = useState(false);
	const { addToCart } = useContext(ShopContext);
	return (
		<div
			className="flex flex-col w-[270px] min-h-[300px]  rounded-sm  hover:scale-105 transition-transform hover:ring-offset-2  hover:ring-1 hover:ring-black/10 hover:shadow-sm"
			onMouseOver={() => setToggle(true)}
			onMouseOut={() => setToggle(false)}>
			<div className="bg-tertiary w-full h-[270px] grid place-items-center relative">
				{discountPercentage && (
					<span className="w-14 h-6 bg-secondary text-white text-xs grid place-items-center rounded-sm absolute top-3 left-3">{discountPercentage}</span>
				)}
				<span className="flex flex-col space-y-2 absolute top-3 right-3">
					<SvgIcon icon={heart()} classVal={"bg-white p-2 rounded-full cursor-pointer"} />
					<SvgIcon icon={eye()} classVal={"bg-white p-2 rounded-full cursor-pointer"} />
				</span>
				<img src={productImage} alt="" />
				{toggle && (
					<button
						type="button"
						className="absolute bottom-0 inset-x-0  text-base bg-black text-white py-2 "
						onClick={() =>
							addToCart({ id, productName, productImage, currentPrice, originalPrice, rating, rateCount, discountPercentage, quantity, subTotal })
						}>
						Add To Cart
					</button>
				)}
			</div>

			<div className="w-full  grid grid-rows-3 p-2">
				<h1 className="font-medium">{productName}</h1>
				<p className="font-medium text-secondary">
					{currentPrice}
					<span className="text-black/50 line-through ml-3">{originalPrice}</span>
				</p>
				<span className="flex items-center">
					<img src={rating} alt="" /> <span className="ml-2 text-black/50">({rateCount})</span>{" "}
				</span>
			</div>
		</div>
	);
};

export default Product;
