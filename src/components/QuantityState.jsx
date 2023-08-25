import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";

const QuantityState = ({ productId, quantity, productPrice }) => {
	const { cartItems, setCartItems } = useContext(ShopContext);
	const [state, setState] = useState(quantity);
	const subTotalVal = Number(productPrice) * Number(state);

	const [subTotal, setSubTotal] = useState(subTotalVal);

	useEffect(() => {
		setSubTotal(subTotalVal);

		const cartList = cartItems.map((item) => (item.id === productId ? { ...item, quantity: state } : item));
		setCartItems(cartList);
		// console.log(cartList);
	}, [state]);

	return (
		<>
			<input type="number" min={1} value={state} className="text-center w-16 py-1 border" onChange={(e) => setState(e.target.value)} />
			<p>{new Intl.NumberFormat("en-US", { currency: "USD", style: "currency" }).format(subTotal)} </p>
		</>
	);
};

export default QuantityState;
