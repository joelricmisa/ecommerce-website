import { SvgIcon } from "./index";
import { cart, xMark } from "../assets/icons/SvgIconsList";
import { ShopContext } from "../contexts/ShopContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
	const navigate = useNavigate();

	useEffect(() => {
		const filterCart = cartItems.filter((item) => item.id === id);
		filterCart.length === 0 ? setInCart(false) : setInCart(true);
	}, [cartItems]);

	return (
		<div className="flex flex-col min-h-[300px]  rounded-sm  hover:scale-105 transition-transform hover:ring-offset-2  hover:ring-1 hover:ring-black/10 hover:shadow-sm">
			<div className="bg-extraColor w-full h-[270px] grid-center relative">
				{discountPercentage && (
					<span className="absolute h-6 text-xs rounded-sm w-14 bg-tertiary-100 text-primary grid-center top-3 left-3">
						{discountPercentage}
					</span>
				)}
				<span
					className="absolute icon grid-center top-3 right-3"
					onClick={() => {
						iconName === "trash" ? removeToWishlist({ id }) : navigate(`/products/${id}`);
					}}>
					<SvgIcon icon={iconValue} />
				</span>
				<img
					src={productImage}
					alt=""
					className="scale-75 xs:scale-90 xl:scale-95"
				/>

				<button
					type="button"
					className="absolute inset-x-0 bottom-0 gap-2 px-0 py-2 bg-black button flex-center"
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

			<div className="grid w-full grid-rows-3 p-2">
				<h1 className="font-medium">{productName}</h1>
				<p className="font-medium text-tertiary-100">
					{currentPrice}
					<span className="ml-3 line-through text-black/50">{originalPrice}</span>
				</p>
				{rating && (
					<span className="justify-start gap-1 flex-center">
						<img
							src={rating}
							alt=""
							className="-ml-1 scale-75 xs:scale-90 xl:scale-95"
						/>{" "}
						<span className="text-black/50">({rateCount})</span>
					</span>
				)}
			</div>
		</div>
	);
};

export default WishlistCard;
