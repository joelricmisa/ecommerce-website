import { useState, createContext, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../api/axios";

export const ShopContext = createContext(0);

const ShopContextProvider = (props) => {
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const [cartItems, setCartItems] = useState();
    const [wishlistItems, setWishlistItems] = useState([]);
    const [category, setCategory] = useState("all");
    const queryClient = useQueryClient();

    const { data: currentUser } = useQuery({
        queryKey: "currentUser",
        queryFn: async () => {
            const response = await axiosPrivate.get("/api/users/current");

            getProducts(response?.data?.data?.cart);

            return response?.data?.data;
        },
    });

    const getProducts = async (arrayIds) => {
        const response = await axios.get("/api/products");
        const products = response?.data?.data;
        //console.log(products);
        const filteredProducts = products?.filter((product) => {
            return arrayIds.includes(product._id.toString());
        });
        //console.log(filteredProducts);
        setCartItems([...filteredProducts]);
    };

    const updateCartData = async (newCartItems) => {
        if (auth) {
            try {
                const response = await axiosPrivate.put(
                    `/api/users/${currentUser?._id}`,
                    JSON.stringify({
                        ...currentUser,
                        productIds: [...newCartItems?.map((item) => item._id)],
                    }),
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    },
                );
                //console.log(response?.data);
                //console.log(response);
                setCartItems([...response?.data?.cart]);
            } catch (err) {
                //console.log(err);
            }
        } else {
            setCartItems([]);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const response = await axiosPrivate.put(
                `/api/users/${currentUser?._id}/remove-from-cart/${productId}`,
                {},
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                },
            );
            getProducts(response?.data?.data);
            // //console.log(response?.data);

            queryClient.invalidateQueries("currentUser");
            return response;
        } catch (error) {
            console.error("Error removing product from cart:", error);
        }
    };

    useEffect(() => {
        if (auth && cartItems.length === 0 && currentUser?.cart) {
            // Only set cart items initially if they are not already set
            setCartItems([...currentUser?.cart]);
        } else {
            // Update cart data if auth changes or cartItems change
            updateCartData(cartItems);
        }
    }, [auth, cartItems]);

    const addToCart = (data) => {
        const filtered = cartItems.filter((item) => item._id === data._id);
        filtered.length === 0 ? setCartItems([...cartItems, data]) : "";
    };

    const addToWishlist = (data) => {
        const filtered = wishlistItems.filter((item) => item._id === data._id);
        filtered.length === 0 ? setWishlistItems([...wishlistItems, data]) : "";
    };

    const removeToCart = (data) => {
        const filtered = cartItems.filter((item) => data._id !== item._id);
        setCartItems(filtered);
        removeFromCart(data._id);
    };

    const removeToWishlist = (data) => {
        const filtered = wishlistItems.filter((item) => data._id !== item._id);
        setWishlistItems(filtered);
    };
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        cartItems.map(
            (product) => (totalAmount += product.quantity * product.price),
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
