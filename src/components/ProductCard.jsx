import { useEffect, useState } from "react";

import { SvgIcon } from "./index";
import { heart, eye, cart, xMark } from "../assets/icons/SvgIconsList";
import { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { Link } from "react-router-dom";

const ProductCard = ({ id, productName, productImage, currentPrice, originalPrice, rating, rateCount, discountPercentage, quantity, subTotal }) => {
	const { addToCart, cartItems, removeToCart, addToWishlist, removeToWishlist, wishlistItems } = useContext(ShopContext);
	const [activeWishlist, setActiveWishlist] = useState(false);
	const [inCart, setInCart] = useState(false);
	const [toggle, setToggle] = useState(false);

	useEffect(() => {
		const filterWishlist = wishlistItems.filter((item) => item.id === id);
		const filterCart = cartItems.filter((item) => item.id === id);
		filterWishlist.length === 0 ? setActiveWishlist(false) : setActiveWishlist(true);
		filterCart.length === 0 ? setInCart(false) : setInCart(true);
	}, [wishlistItems, cartItems]);

	return (
		<div
			className="flex flex-col min-h-[300px]  rounded-sm  hover:scale-105 transition-transform hover:ring-offset-2  hover:ring-1 hover:ring-black/10 hover:shadow-sm relative"
			onMouseOver={() => setToggle(true)}
			onMouseOut={() => setToggle(false)}>
			<div className="bg-extraColor w-full h-[270px]  grid-center relative">
				{discountPercentage && (
					<span className="w-14 h-6 bg-tertiary-100 text-primary text-xs grid-center rounded-sm absolute top-3 left-3">{discountPercentage}</span>
				)}
				<div className="flex flex-col gap-2 absolute top-3 right-3">
					<span
						className={`icon grid-center ${activeWishlist ? "text-tertiary-100" : "hover:text-tertiary-100"} `}
						onClick={() =>
							activeWishlist
								? removeToWishlist({ id })
								: addToWishlist({
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
						<SvgIcon icon={heart(` ${activeWishlist ? "fill-tertiary-100" : "text-tertiary-200 fill-none hover:fill-tertiary-100"}`)} />
					</span>

					<Link to={`/products/${id}`} className="icon grid-center  ">
						<SvgIcon icon={eye("text-white fill-tertiary-200 ")} />
					</Link>
				</div>
				<img src={productImage} className="scale-75 xs:scale-90 xl:scale-95" alt="" />
				{toggle && (
					<button
						type="button"
						className="button bg-secondary flex-center py-2 gap-2 absolute bottom-0 inset-x-0 px-0"
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
				)}
			</div>

			<div className="w-full  flex flex-col gap-2 p-2">
				<h1 className="font-medium">{productName}</h1>
				<p className="font-medium text-secondary-100">
					{currentPrice}
					<span className="text-black/50 line-through ml-3">{originalPrice}</span>
				</p>
				<div className="flex-center gap-1 justify-start ">
					<img src={rating} alt="" className="-ml-1 scale-75 xs:scale-90 xl:scale-95" /> <span className="text-black/50">({rateCount})</span>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
