import { useContext, useEffect, useState } from "react";
import { SvgIcon } from "../components";
import { ShopContext } from "../contexts/ShopContext";
import { xMark } from "../assets/icons/SvgIconsList";

const QuantityState = ({ productId, quantity, productPrice }) => {
	const { cartItems, setCartItems, removeToCart } = useContext(ShopContext);
	const [state, setState] = useState(quantity);
	const [productSubTotal, setProductSubTotal] = useState(Number(productPrice) * Number(state));
	const formatNumer = new Intl.NumberFormat("en-US", { currency: "USD", style: "currency" });
	useEffect(() => {
		setProductSubTotal(Number(productPrice) * Number(state));

		const cartList = cartItems.map((item) => (item.id === productId ? { ...item, quantity: state, subTotal: productSubTotal } : item));
		setCartItems(cartList);
		console.log(cartItems);
	}, [state, productSubTotal]);
	useEffect(() => {
		setState(quantity);
	}, [removeToCart]);
	console.log(cartItems);
	return (
		<>
			{console.log(cartItems)}
			<input type="number" min={1} value={state} className="text-center w-16 mx-auto py-1 border" onChange={(e) => setState(e.target.value)} />
			<p className="flex-center">{formatNumer.format(productSubTotal)} </p>
			<span className="flex-center bg-secondary w-8 h-8 mx-auto  shadow-sm p-0.5 cursor-pointer" onClick={() => removeToCart({ id: productId })}>
				<SvgIcon icon={xMark()} />
			</span>
		</>
	);
};

export default QuantityState;
