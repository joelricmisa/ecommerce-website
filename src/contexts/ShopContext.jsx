import { useState, createContext, useEffect, useRef } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../api/axios";

export const ShopContext = createContext(0);

const ShopContextProvider = (props) => {
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [category, setCategory] = useState("all");
    const [isCartUpdated, setIsCartUpdated] = useState(false);
    const [isWishlistUpdated, setIsWishlistUpdated] = useState(false);
    const queryClient = useQueryClient();
    const prevCartItems = useRef(cartItems.length);
    const prevWishlistItems = useRef(wishlistItems.length);

    const { data: currentUser } = useQuery({
        queryKey: ["currentUser"],

        queryFn: async () => {
            //cart
            let cartIds = [];
            cartItems?.map((item) => cartIds.push(item._id));
            localStorage.setItem("cartIds", JSON.stringify(cartIds));
            //wishlist
            let wishlistIds = [];
            wishlistItems?.map((item) => wishlistIds.push(item._id));
            localStorage.setItem("wishlistIds", JSON.stringify(wishlistIds));

            const response = await axiosPrivate.get("/api/users/current");
            console.log("running current user");
            getCartProducts(response?.data?.data?.cart);
            getWishlistProducts(response?.data?.data?.wishlist);

            console.log(response?.data);
            return response?.data?.data;
        },
        enabled: !!auth,
    });

    //CART//CART//CART//CART//CART//CART//CART//CART//CART

    useEffect(() => {
        const cartIds = JSON.parse(localStorage.getItem("cartIds"));
        cartIds?.length > 0 ? updateCartData(cartIds) : "";

        setIsCartUpdated(true);
        localStorage.removeItem("cartIds");
    }, [currentUser?._id]);

    useEffect(() => {
        if (auth && currentUser?._id && isCartUpdated) {
            let cartIds = [];
            cartItems?.map((item) => cartIds.push(item._id));

            if (cartItems.length > prevCartItems.current) {
                updateCartData(cartIds);
            }

            prevCartItems.current = cartItems.length;
        }
    }, [cartItems.length]);

    const updateCartData = async (newCartItems) => {
        if (currentUser) {
            try {
                // console.log("Request Data:", {
                //     ...currentUser,
                //     cartIds: newCartItems || [],
                // });

                const response = await axiosPrivate.put(
                    `/api/users/${currentUser?._id}`,
                    {
                        ...currentUser,
                        cartIds: newCartItems || [],
                    },
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    },
                );

                // console.log("Response:", response.data);
                queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            } catch (err) {
                console.log(err);
            }
        }
    };

    const getCartProducts = async (arrayIds) => {
        const response = await axios.get("/api/products");
        const products = response?.data?.data;

        const filteredProducts = products?.filter((product) => {
            return arrayIds.includes(product._id.toString());
        });

        setCartItems([...filteredProducts]);
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

            queryClient.invalidateQueries({ queryKey: ["currentUser"] });

            return response;
        } catch (error) {
            console.error("Error removing product from cart:", error);
        }
    };

    const addToCart = (data) => {
        const isItemInList = cartItems?.some((item) => item._id === data._id);
        !isItemInList ? setCartItems([...cartItems, data]) : "";
    };

    const removeToCart = (data) => {
        const filtered = cartItems.filter((item) => data._id !== item._id);
        setCartItems(filtered);
        if (auth) {
            removeFromCart(data._id);
        }
    };

    //WISHLIST//WISHLIST//WISHLIST//WISHLIST//WISHLIST//WISHLIST

    useEffect(() => {
        const wishlistIds = JSON.parse(localStorage.getItem("wishlistIds"));
        wishlistIds?.length > 0 ? updateWishlistData(wishlistIds) : "";

        setIsWishlistUpdated(true);
        localStorage.removeItem("wishlistIds");
    }, [currentUser?._id]);

    useEffect(() => {
        if (auth && currentUser?._id && isWishlistUpdated) {
            let wishlistIds = [];
            wishlistItems?.map((item) => wishlistIds.push(item._id));

            if (wishlistItems.length > prevWishlistItems.current) {
                updateWishlistData(wishlistIds);
            }

            prevWishlistItems.current = wishlistItems.length;
        }
    }, [wishlistItems.length]);

    const updateWishlistData = async (newWishlistItems) => {
        if (currentUser) {
            try {
                // console.log("Request Data for wishlist:", {
                //     ...currentUser,
                //     wishlistIds: newWishlistItems || [],
                // });

                const response = await axiosPrivate.put(
                    `/api/users/${currentUser?._id}`,
                    JSON.stringify({
                        ...currentUser,
                        wishlistIds: newWishlistItems || [],
                    }),
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    },
                );

                // console.log("Response:", response.data);
                queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            } catch (err) {
                console.log(err);
            }
        }
    };

    const getWishlistProducts = async (arrayIds) => {
        const response = await axios.get("/api/products");
        const products = response?.data?.data;

        const filteredProducts = products?.filter((product) => {
            return arrayIds.includes(product._id.toString());
        });

        setWishlistItems([...filteredProducts]);
    };

    const removeFromWishlist = async (productId) => {
        try {
            const response = await axiosPrivate.put(
                `/api/users/${currentUser?._id}/remove-from-wishlist/${productId}`,
                {},
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                },
            );

            queryClient.invalidateQueries({ queryKey: ["currentUser"] });

            return response;
        } catch (error) {
            console.error("Error removing product from wishlist:", error);
        }
    };

    const addToWishlist = (data) => {
        const isItemInList = wishlistItems?.some(
            (item) => item._id === data._id,
        );
        !isItemInList ? setWishlistItems([...wishlistItems, data]) : "";
    };

    const removeToWishlist = (data) => {
        const filtered = wishlistItems.filter((item) => data._id !== item._id);
        setWishlistItems(filtered);
        if (auth) {
            removeFromWishlist(data._id);
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        cartItems?.map(
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
        currentUser,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
