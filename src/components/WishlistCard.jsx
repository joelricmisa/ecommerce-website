import { SvgIcon } from "./index";
import { cart, xMark } from "../assets/icons/SvgIconsList";
import { ShopContext } from "../contexts/ShopContext";
import { useContext, useState, useEffect } from "react";
const WishlistCard = ({
	id,
	productName,
	productImage,
	currentPrice,
	originalPrice,
	rating,
	rateCount,
	discountPercentage,
	iconValue,
	iconName,
	quantity,
	subTotal,
}) => {
	const { cartItems, addToCart, removeToCart, removeToWishlist } = useContext(ShopContext);
	const [inCart, setInCart] = useState(false);
	const [toggle, setToggle] = useState(false);

	useEffect(() => {
		const filterCart = cartItems.filter((item) => item.id === id);
		filterCart.length === 0 ? setInCart(false) : setInCart(true);
	}, [cartItems]);

	return (
		<div className="flex flex-col min-h-[300px]  rounded-sm  hover:scale-105 transition-transform hover:ring-offset-2  hover:ring-1 hover:ring-black/10 hover:shadow-sm">
			<div className="bg-extraColor w-full h-[270px] grid-center relative">
				{discountPercentage && (
					<span className="w-14 h-6 bg-tertiary-100 text-primary text-xs grid-center rounded-sm absolute top-3 left-3">{discountPercentage}</span>
				)}
				<span
					className="flex flex-col space-y-2 absolute top-3 right-3"
					onClick={() => {
						iconName === "trash" ? removeToWishlist({ id }) : "";
					}}>
					<SvgIcon icon={iconValue} classVal={"bg-primary p-2 grid-center rounded-full cursor-pointer"} />
				</span>
				<img src={productImage} alt="" className="scale-75 xs:scale-90 xl:scale-95" />
				{/* 
				<button
					type="button"
					className="button flex-center gap-2 bg-black py-2 absolute bottom-0 inset-x-0"
					onClick={() =>
						addToCart({
							id,
							productName,
							productImage,
							currentPrice,
							originalPrice,
							rating,
							rateCount,
							discountPercentage,
							quantity,
							subTotal,
						})
					}>
					<SvgIcon icon={cart("w-6 h-6")} /> Add To Cart
				</button> */}

				<button
					type="button"
					className="button bg-black flex-center py-2 gap-2 absolute bottom-0 inset-x-0 px-0"
					onClick={() =>
						inCart
							? removeToCart({ id })
							: addToCart({
									id,
									productName,
									productImage,
									currentPrice,
									originalPrice,
									rating,
									rateCount,
									discountPercentage,
									quantity,
									subTotal,
							  })
					}>
					{inCart ? <SvgIcon icon={xMark("w-6 h-6")} /> : <SvgIcon icon={cart("w-6 h-6")} />}
					{inCart ? "Remove " : "Add To Cart"}
				</button>
			</div>

			<div className="w-full  grid grid-rows-3 p-2">
				<h1 className="font-medium">{productName}</h1>
				<p className="font-medium text-tertiary-100">
					{currentPrice}
					<span className="text-black/50 line-through ml-3">{originalPrice}</span>
				</p>
				{rating && (
					<span className="flex-center gap-1 justify-start">
						<img src={rating} alt="" className="-ml-1 scale-75 xs:scale-90 xl:scale-95" /> <span className="text-black/50">({rateCount})</span>
					</span>
				)}
			</div>
		</div>
	);
};

export default WishlistCard;
