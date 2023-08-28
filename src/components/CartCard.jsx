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
		<div className="flex-center gap-0  w-full shadow-sm rounded-sm last:mb-0 relative">
			<div className="flex-center flex-col xl:flex-row justify-evenly xl:justify-start xl:pl-28 w-1/2  xl:w-2/6  py-5 px-2 border-r border-black/10 xl:border-r-0 ">
				<img src={productImage} className="h-16 w-20 object-contain" alt="" />
				<p> {productName}</p>
			</div>
			<div className="xl:w-4/6 w-1/2 flex-center xl:flex-row flex-col pt-14 pb-10">
				<div className="flex-center justify-evenly   xl:w-1/2 ">
					<p>${currentPrice} (1)</p>

					<input
						type="number"
						min={1}
						value={state < 10 ? `0${state}` : state}
						className="input w-16 text-center font-inter "
						onChange={(e) => setState(e.target.value)}
					/>
				</div>
				<div className="flex-center justify-evenly  xl:w-1/2 ">
					<p className="">
						<span className="font-semibold mr-1">Subtotal:</span> {formatNumber.format(productSubTotal)}{" "}
					</p>
					<span
						className="absolute xl:static  top-0 right-0  flex-center bg-secondary w-8 h-8 shadow-sm p-0.5 cursor-pointer"
						onClick={() => removeToCart({ id: id })}>
						<SvgIcon icon={xMark()} />
					</span>
				</div>
			</div>
		</div>
	);
};

export default CartCard;
