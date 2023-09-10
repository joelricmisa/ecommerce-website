import { useState, createContext } from "react";
export const ShopContext = createContext(0);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [category, setCategory] = useState("all");

  const addToCart = (data) => {
    const filtered = cartItems.filter((item) => item.id === data.id);
    filtered.length === 0 ? setCartItems([...cartItems, data]) : "";
  };

  const addToWishlist = (data) => {
    const filtered = wishlistItems.filter((item) => item.id === data.id);
    filtered.length === 0 ? setWishlistItems([...wishlistItems, data]) : "";
  };

  const removeToCart = (data) => {
    const filtered = cartItems.filter((item) => data.id !== item.id);
    setCartItems(filtered);
  };

  const removeToWishlist = (data) => {
    const filtered = wishlistItems.filter((item) => data.id !== item.id);
    setWishlistItems(filtered);
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    cartItems.map(
      (product) =>
        (totalAmount +=
          product.quantity * product.currentPrice.replace("$", "")),
    );

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

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
