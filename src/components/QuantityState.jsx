import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";

const QuantityState = ({ productId, quantity, productPrice }) => {
	const { cartItems, setCartItems } = useContext(ShopContext);
	const [state, setState] = useState(quantity);
	const [productSubTotal, setProductSubTotal] = useState(Number(productPrice) * Number(state));

	useEffect(() => {
		setProductSubTotal(Number(productPrice) * Number(state));
		const cartList = cartItems.map((item) => (item.id === productId ? { ...item, quantity: state, subTotal: productSubTotal } : item));
		setCartItems(cartList);
		console.log(cartItems);
	}, [state, productSubTotal]);
	console.log(cartItems);
	return (
		<>
			{console.log(cartItems)}
			<input type="number" min={1} value={state} className="text-center w-16 py-1 border" onChange={(e) => setState(e.target.value)} />
			<p>{new Intl.NumberFormat("en-US", { currency: "USD", style: "currency" }).format(productSubTotal)} </p>
		</>
	);
};

export default QuantityState;
