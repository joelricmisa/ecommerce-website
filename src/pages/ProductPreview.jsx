import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductCard, ScrollToTop, SvgIcon } from "../components";
import { shopProductsData } from "../constants";
import { box, heart, cart, xMark } from "../assets/icons/SvgIconsList";
import { useLocation, Link } from "react-router-dom";
import { returnIcon, truck } from "../assets/icons";
import { ShopContext } from "../contexts/ShopContext";

const ProductPreview = () => {
	const location = useLocation();
	const { id } = useParams();
	const currentItem = shopProductsData.filter((product) => product.id === Number(id));
	const productObj = currentItem[0];

	const { cartItems, addToCart, removeToCart, addToWishlist, removeToWishlist, wishlistItems, setCategory } = useContext(ShopContext);

	const crumbsList = [
		{ label: "Home", path: "/", setCateg: "all" },
		{ label: "Products", path: "/products", setCateg: "all" },
		{ label: productObj.category, path: "/products", setCateg: productObj.category },
		{ label: productObj.productName, path: location.pathname, setCateg: "all" },
	];

	const [quantity, setQuantity] = useState(1);
	const [relatedProduct, setRelatedProduct] = useState([]);
	const [activeWishlist, setActiveWishlist] = useState(false);
	const [inCart, setInCart] = useState(false);
	console.log(currentItem);

	console.log(activeWishlist);
	useEffect(() => {
		const filterWishlist = wishlistItems.filter((item) => item.id === Number(id));
		const filterCart = cartItems.filter((item) => item.id === Number(id));
		filterWishlist.length === 0 ? setActiveWishlist(false) : setActiveWishlist(true);
		filterCart.length === 0 ? setInCart(false) : setInCart(true);
	}, [wishlistItems, cartItems, id]);

	useEffect(() => {
		const relatedItems = shopProductsData
			.filter((product) => product.category === productObj?.category)
			.filter((item) => item.id !== Number(id));

		console.log(relatedItems);
		setRelatedProduct(relatedItems);
	}, [id]);

	return (
		<section className="padding animate">
			<p>
				{crumbsList.map((link, index) => {
					return (
						<Link
							to={link.path}
							className="capitalize  after:content-['/'] after:mx-2 after:last:content-[''] opacity-50 last:opacity-100"
							key={index}
							onClick={() => setCategory(link.setCateg)}>
							{link.label}
						</Link>
					);
				})}
			</p>
			<div className="flex-col items-start gap-10 my-10 flex-center xl:flex-row ">
				<div className=" bg-extraColor grid-center py-14 xl:min-h-[400px]   w-full xl:w-1/2">
					<img
						src={productObj.productImage}
						alt=""
						className="scale-100 xl:scale-150"
					/>
				</div>

				<div className="flex-col items-start w-full gap-3 xl:w-1/2 flex-center">
					<h1 className="text-2xl font-semibold">{productObj.productName}</h1>
					<span className="justify-start flex-center text-black/60 ">
						<img
							src={productObj.rating}
							alt=""
						/>
						<p>({productObj.rateCount} Reviews)</p>
					</span>
					<p className="text-2xl">{productObj.currentPrice}</p>
					<p className="pb-5 text-sm leading-7 border-b border-black/10">{productObj.description}</p>

					<div className="flex-col w-full my-3 flex-center xl:flex-row">
						<div className="w-full gap-0 flex-center xl:w-1/4">
							<button
								type="button"
								className="w-1/4 p-2 mx-0 button xl:w-auto"
								onClick={() => (quantity === 1 ? setQuantity(1) : setQuantity(quantity - 1))}>
								-
							</button>
							<input
								type="number"
								min={1}
								value={`${quantity < 10 ? `0${quantity}` : quantity}`}
								className="py-2 mx-0 text-center input"
								onChange={(e) => setQuantity(e.target.value)}
							/>
							<button
								type="button"
								className="w-1/4 p-2 mx-0 button xl:w-auto"
								onClick={() => setQuantity(quantity + 1)}>
								+
							</button>
						</div>

						<button
							type="button"
							className="w-full py-2 button xl:w-1/2 flex-center"
							onClick={() => (inCart ? removeToCart({ id: Number(id) }) : addToCart({ ...productObj, quantity: quantity }))}>
							{inCart ? <SvgIcon icon={xMark("w-6 h-6")} /> : <SvgIcon icon={cart("w-6 h-6")} />}
							{inCart ? "Remove in Cart " : "Add To Cart"}
						</button>

						<span
							className={`icon border border-black/10 rounded-md scale-125 xl:scale-100 ${
								activeWishlist ? "text-tertiary-100" : "hover:text-tertiary-100"
							} `}
							onClick={() => (activeWishlist ? removeToWishlist({ id: Number(id) }) : addToWishlist(productObj))}>
							<SvgIcon icon={heart(` ${activeWishlist ? "fill-tertiary-100" : "text-tertiary-200 fill-none hover:fill-tertiary-100"}`)} />
						</span>
					</div>
					<div className="flex flex-col w-full my-3 text-sm">
						<p className="justify-start p-3 border flex-center border-black/ ">
							<img
								src={truck}
								alt=""
							/>
							<span>
								Free delivery <br />
								Enter your postal code for Delivery Availability
							</span>
						</p>
						<p className="justify-start p-3 border flex-center border-black/ ">
							<img
								src={returnIcon}
								alt=""
							/>
							<span>
								Return Delivery <br />
								Free 30 Days Delivery Returns. Details
							</span>
						</p>
					</div>
				</div>
			</div>

			<div className="flex flex-col w-full gap-10 padding-y">
				<div className="justify-start h-10 font-semibold text-tertiary-100 flex-center ">
					<span className="w-5 h-10 rounded-sm bg-tertiary-100 "></span>

					{relatedProduct.length > 1 ? "Related Items" : "Related Item"}
				</div>

				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10">
					{relatedProduct.length !== 0 ? (
						relatedProduct.map((product, index) => {
							return (
								<ProductCard
									key={index}
									id={product.id}
									productName={product.productName}
									productImage={product.productImage}
									currentPrice={product.currentPrice}
									originalPrice={product.originalPrice}
									rating={product.rating}
									rateCount={product.rateCount}
									discountPercentage={product.discountPercentage}
									quantity={product.quantity}
									subTotal={product.subTotal}
								/>
							);
						})
					) : (
						<span className="col-span-12 py-10 text-xl flex-center">
							<SvgIcon icon={box("text-black h-14 w-14")} /> No results found
						</span>
					)}
				</div>
			</div>
		</section>
	);
};

export default ProductPreview;
