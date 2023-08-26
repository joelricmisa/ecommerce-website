import { useEffect, useState } from "react";

import { SvgIcon } from "./index";
import { heart, eye, cart } from "../assets/icons/SvgIconsList";
import { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";

const ProductCard = ({ id, productName, productImage, currentPrice, originalPrice, rating, rateCount, discountPercentage, quantity, subTotal }) => {
	const [toggle, setToggle] = useState(false);
	const { addToCart, cartItems, removeToCart, addToWishlist, wishlistItems } = useContext(ShopContext);
	const [activeWishlist, setActiveWishlist] = useState(false);
	const [inCart, setInCart] = useState(false);

	useEffect(() => {
		const filterWishlist = wishlistItems.filter((item) => item.id === id);
		const filterCart = cartItems.filter((item) => item.id === id);
		filterWishlist.length === 0 ? setActiveWishlist(false) : setActiveWishlist(true);
		filterCart.length === 0 ? setInCart(false) : setInCart(true);
	}, [wishlistItems, cartItems]);

	return (
		<div
			className="flex flex-col w-[270px] min-h-[300px]  rounded-sm  hover:scale-105 transition-transform hover:ring-offset-2  hover:ring-1 hover:ring-black/10 hover:shadow-sm"
			onMouseOver={() => setToggle(true)}
			onMouseOut={() => setToggle(false)}>
			<div className="bg-tertiary w-full h-[270px] grid place-items-center relative">
				{discountPercentage && (
					<span className="w-14 h-6 bg-secondary text-white text-xs grid place-items-center rounded-sm absolute top-3 left-3">{discountPercentage}</span>
				)}
				<div className="flex flex-col gap-2  absolute top-3 right-3">
					<span
						className={`bg-white p-2 grid place-items-center rounded-full cursor-pointer   shadow-md  ${
							activeWishlist ? "text-red-500" : "hover:text-red-500"
						} `}
						onClick={() =>
							addToWishlist({ id, productName, productImage, currentPrice, originalPrice, rating, rateCount, discountPercentage, quantity, subTotal })
						}>
						<SvgIcon
							icon={heart(`${activeWishlist ? "fill-red-500" : "hover:fill-red-500"}`)}
							onClick={() =>
								addToWishlist({ id, productName, productImage, currentPrice, originalPrice, rating, rateCount, discountPercentage, quantity, subTotal })
							}
						/>
					</span>

					<span className="bg-white p-2 grid place-items-center rounded-full cursor-pointer hover:bg-secondary hover:text-white ">
						<SvgIcon icon={eye()} />
					</span>
				</div>
				<img src={productImage} alt="" />
				{toggle && (
					<button
						type="button"
						className="absolute bottom-0 inset-x-0  text-base bg-black text-white py-2 flex items-center justify-center gap-2"
						onClick={() =>
							inCart
								? removeToCart({ id })
								: addToCart({ id, productName, productImage, currentPrice, originalPrice, rating, rateCount, discountPercentage, quantity, subTotal })
						}>
						<SvgIcon icon={cart("w-6 h-6")} />
						{inCart ? "Remove To Cart" : "Add To Cart"}
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

export default ProductCard;
