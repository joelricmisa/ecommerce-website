import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";

const State = ({ productId, quantity, productPrice }) => {
	const { cartItems, setCartItems } = useContext(ShopContext);
	const [state, setState] = useState(quantity);
	const subTotalVal = Number(productPrice) * Number(state);

	const [subTotal, setSubTotal] = useState(subTotalVal);

	useEffect(() => {
		setSubTotal(subTotalVal);

		const tempCart = Object.entries(cartItems)
			.map((item) => (item[1].id === productId ? { ...item, 1: { ...item[1], quantity: state } } : item))
			.map((item) => item[1]);

		let cartList = [];

		for (let i = 0; i < tempCart.length; i++) {
			cartList[tempCart[i].id] = tempCart[i];
		}

		setCartItems(cartList);

		console.log(cartItems);
	}, [state]);

	return (
		<>
			<input type="number" min={1} value={state} className="text-center w-16 py-1 border" onChange={(e) => setState(e.target.value)} />
			<p>{new Intl.NumberFormat("en-US", { currency: "USD", style: "currency" }).format(subTotal)} </p>
		</>
	);
};

export default State;
