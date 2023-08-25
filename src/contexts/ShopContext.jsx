import { useState, createContext } from "react";
import { cartData, wishlistData } from "../constants/index";
export const ShopContext = createContext(0);

const getDefaultCart = () => {
	let cart = [];
	for (let i = 0; i < cartData.cartProducts.length; i++) {
		cart.push(cartData.cartProducts[i]);

		// cart[cartData.cartProducts[i].id] = cartData.cartProducts[i];
	}
	return cart;
};
const getDefaultWishlist = () => {
	let wishlist = [];
	for (let i = 0; i < wishlistData.length; i++) {
		wishlist[wishlistData[i].id] = wishlistData[i];
	}
	return wishlist;
};

const ShopContextProvider = (props) => {
	const [cartItems, setCartItems] = useState(getDefaultCart);
	const [wishlistItems, setWishlistItems] = useState(getDefaultWishlist);

	const addToCart = (data) => {
		const filtered = cartItems.filter((item) => item.id === data.id);
		filtered.length === 0 ? setCartItems([...cartItems, data]) : "";
	};

	const addToWishlist = (data) => {
		setWishlistItems((prev) => ({ ...prev, [data.id]: data }));

		console.log(wishlistItems);
	};

	const getTotalCartAmount = () => {
		let totalAmount = 0;
		cartItems.map((product) => (totalAmount += product.quantity * product.currentPrice.replace("$", "")));

		return totalAmount;
	};

	const contextValue = {
		cartItems,
		setCartItems,
		wishlistItems,
		addToCart,
		addToWishlist,
		getTotalCartAmount,
	};

	return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
