import React, { useEffect, useState, createContext, useRef } from "react";
import { cartData, wishlistData } from "../constants/index";
export const ShopContext = createContext(0);

const getDefaultCart = () => {
	let cart = [];
	for (let i = 0; i < cartData.cartProducts.length; i++) {
		cart[cartData.cartProducts[i].id] = cartData.cartProducts[i];
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
	const [cartItems, setCartItems] = useState(getDefaultCart());
	const [wishlistItems, setWishlistItems] = useState(getDefaultWishlist());

	const addToCart = (data) => {
		setCartItems({ ...cartItems, [data.id]: data });
		// console.log(cartItems);
	};

	const addToWishlist = (data) => {
		setWishlistItems((prev) => ({ ...prev, [data.id]: data }));
		console.log(wishlistItems);
	};

	const getTotalCartAmount = () => {
		let totalAmount = 0;

		Object.entries(cartItems).map((product) => {
			totalAmount += product[1].quantity * product[1].currentPrice.replace("$", "");
			console.log(totalAmount);
		});

		return totalAmount;
	};

	console.log(cartItems);
	// console.log(wishlistItems);
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
