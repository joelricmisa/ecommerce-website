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
		wishlist.push(wishlistData[i]);
	}
	return wishlist;
};

const ShopContextProvider = (props) => {
	const [cartItems, setCartItems] = useState(getDefaultCart);
	const [wishlistItems, setWishlistItems] = useState(getDefaultWishlist);
	const [category, setCategory] = useState("all");

	const addToCart = (data) => {
		const filtered = cartItems.filter((item) => item.id === data.id);
		filtered.length === 0 ? setCartItems([...cartItems, data]) : "";
	};

	const addToWishlist = (data) => {
		const filtered = wishlistItems.filter((item) => item.id === data.id);
		filtered.length === 0 ? setWishlistItems([...wishlistItems, data]) : "";
		// console.log(wishlistItems);
	};

	const removeToCart = (data) => {
		const filtered = cartItems.filter((item) => data.id !== item.id);
		setCartItems(filtered);
	};

	const removeToWishlist = (data) => {
		const filtered = wishlistItems.filter((item) => data.id !== item.id);
		setWishlistItems(filtered);
		// console.log(filtered);
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
		setWishlistItems,
		addToCart,
		addToWishlist,
		removeToWishlist,
		removeToCart,
		getTotalCartAmount,
		category,
		setCategory,
	};

	return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
