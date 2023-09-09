import { useContext, useEffect, useState } from "react";
import { SvgIcon } from "../components";
import { ShopContext } from "../contexts/ShopContext";
import { xMark } from "../assets/icons/SvgIconsList";
const CartCard = ({ id, productName, productImage, currentPrice, quantity }) => {
	const { cartItems, setCartItems, removeToCart } = useContext(ShopContext);
	const [state, setState] = useState(quantity);
	const [productSubTotal, setProductSubTotal] = useState(Number(currentPrice) * Number(state));
	const formatNumber = new Intl.NumberFormat("en-US", {
		currency: "USD",
		style: "currency",
	});
	useEffect(() => {
		setProductSubTotal(Number(currentPrice) * Number(state));

		const cartList = cartItems.map((item) => (item.id === id ? { ...item, quantity: state, subTotal: productSubTotal } : item));
		setCartItems(cartList);
		console.log(cartItems);
	}, [state, productSubTotal]);
	useEffect(() => {
		setState(quantity);
	}, [removeToCart]);
	console.log(cartItems);
	return (
		<div className="relative w-full gap-0 rounded-sm shadow-sm flex-center last:mb-0">
			<div className="flex-col w-1/2 px-2 py-5 border-r flex-center xl:flex-row justify-evenly xl:justify-start xl:pl-28 xl:w-2/6 border-black/10 xl:border-r-0 ">
				<img
					src={productImage}
					className="object-contain w-20 h-16"
					alt=""
				/>
				<p> {productName}</p>
			</div>
			<div className="flex-col w-1/2 pb-10 xl:w-4/6 flex-center xl:flex-row pt-14">
				<div className="flex-center justify-evenly xl:w-1/2 ">
					<p>${currentPrice} (1)</p>

					<input
						type="number"
						min={1}
						value={state < 10 ? `0${state}` : state}
						className="w-16 text-center input font-inter "
						onChange={(e) => setState(e.target.value)}
					/>
				</div>
				<div className="flex-center justify-evenly xl:w-1/2 ">
					<p className="">
						<span className="mr-1 font-semibold">Subtotal:</span> {formatNumber.format(productSubTotal)}{" "}
					</p>
					<span
						className="absolute xl:static  top-0 right-0  flex-center bg-tertiary-100 w-8 h-8 shadow-sm p-0.5 cursor-pointer hover:bg-tertiary-200 hover:ring hover:ring-black/70 active:bg-tertiary-300"
						onClick={() => removeToCart({ id: id })}>
						<SvgIcon icon={xMark()} />
					</span>
				</div>
			</div>
		</div>
	);
};

export default CartCard;
