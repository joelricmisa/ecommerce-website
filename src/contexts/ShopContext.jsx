import {
    useState,
    createContext,
    useEffect,
    memo,
    useMemo,
    useContext,
} from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../api/axios";
import FeedbackContext from "./FeedbackProvider";

export const ShopContext = createContext(0);

const ShopContextProvider = (props) => {
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [category, setCategory] = useState("all");
    const [triggerQty, setTriggerQty] = useState(0);

    const [totalAmount, setTotalAmount] = useState(0);
    // const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();
    const { setMessage, setShowAlert, setType } = useContext(FeedbackContext);

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

            getCartProducts(response?.data?.data?.cart);

            getWishlistProducts(response?.data?.data?.wishlist);

            console.log(response?.data);
            // setIsLoading(false);
            return response?.data?.data;
        },
        enabled: !!auth,
    });

    //CART//CART//CART//CART//CART//CART//CART//CART//CART

    useEffect(() => {
        const cartIds = JSON.parse(localStorage.getItem("cartIds"));
        cartIds?.length > 0 ? updateCartItems(cartIds) : "";
        localStorage.removeItem("cartIds");
    }, [currentUser?._id]);

    const addToCart = (data) => {
        if (auth) {
            const isItemInList = cartItems?.some(
                (item) => item._id === data._id,
            );
            !isItemInList ? updateCartItems([data._id]) : "";

            setType("success");
            setShowAlert(true);
            setMessage(`Added ${data.name} to cart successfully`);
        }

        if (!auth) {
            // setIsLoading(false);
            const isItemInList = cartItems?.some(
                (item) => item._id === data._id,
            );
            !isItemInList ? setCartItems([...cartItems, data]) : "";
            setType("success");
            setShowAlert(true);
            setMessage(`Added ${data.name} to cart successfully`);
        }

        // localstorage quantity
        const itemQty = localStorage.getItem("productQty");

        const productsQty = itemQty ? JSON.parse(itemQty) : [];

        const productIndex = productsQty.findIndex((item) => {
            return item.id === data._id;
        });

        if (productIndex !== -1) {
            productsQty.splice(productIndex, 1, {
                id: data._id,
                quantity: data.quantity,
            });
        } else {
            productsQty.push({
                id: data._id,
                quantity: data.quantity,
            });
        }

        localStorage.setItem("productQty", JSON.stringify(productsQty));

        // console.log(productsQty);
    };

    const updateCartItems = async (newCartItems) => {
        if (currentUser) {
            try {
                // console.log("Request Data:", {
                //     ...currentUser,
                //     cartIds: [newCartItems] || [],
                // });

                await axiosPrivate.put(
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

    const removeCartItem = (data) => {
        if (auth) {
            removeCartItemFromUser(data._id);

            setType("delete");
            setShowAlert(true);
            setMessage(`Removed ${data.name} from cart successfully`);
        }

        if (!auth) {
            // setIsLoading(false);
            const filtered = cartItems.filter((item) => data._id !== item._id);
            setCartItems(filtered);

            setType("delete");
            setShowAlert(true);
            setMessage(`Removed ${data.name} from cart successfully`);
        }

        const itemQty = localStorage.getItem("productQty");

        const productsQty = itemQty ? JSON.parse(itemQty) : [];

        const productIndex = productsQty.findIndex((item) => {
            return item.id === data._id;
        });

        if (productIndex !== -1) {
            productsQty.splice(productIndex, 1);
        }

        localStorage.setItem("productQty", JSON.stringify(productsQty));
    };

    //remove product from cart db
    const removeCartItemFromUser = async (productId) => {
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

    //WISHLIST//WISHLIST//WISHLIST//WISHLIST//WISHLIST//WISHLIST

    useEffect(() => {
        const wishlistIds = JSON.parse(localStorage.getItem("wishlistIds"));
        wishlistIds?.length > 0 ? updateWishlistItems(wishlistIds) : "";
        localStorage.removeItem("wishlistIds");
    }, [currentUser?._id]);

    const addToWishlist = (data) => {
        if (auth) {
            const isItemInList = wishlistItems?.some(
                (item) => item._id === data._id,
            );
            !isItemInList ? updateWishlistItems([data._id]) : "";

            setType("success");
            setShowAlert(true);
            setMessage(`Added ${data.name} to wishlist successfully`);
        }

        if (!auth) {
            // setIsLoading(false);
            const isItemInList = wishlistItems?.some(
                (item) => item._id === data._id,
            );
            !isItemInList ? setWishlistItems([...wishlistItems, data]) : "";

            setType("success");
            setShowAlert(true);
            setMessage(`Added ${data.name} to wishlist successfully`);
        }
    };

    const updateWishlistItems = async (newWishlistItems) => {
        if (currentUser) {
            try {
                // console.log("Request Data for wishlist:", {
                //     ...currentUser,
                //     wishlistIds: newWishlistItems || [],
                // });

                await axiosPrivate.put(
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

    const removeWishlistItem = (data) => {
        if (auth) {
            removeWishlistItemFromUser(data._id);

            setType("delete");
            setShowAlert(true);
            setMessage(`Removed ${data.name} from wishlist successfully`);
        }

        if (!auth) {
            // setIsLoading(false);
            const filtered = wishlistItems.filter(
                (item) => data._id !== item._id,
            );
            setWishlistItems(filtered);

            setType("delete");
            setShowAlert(true);
            setMessage(`Removed ${data.name} from wishlist successfully`);
        }
    };

    const removeWishlistItemFromUser = async (productId) => {
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

    //clean up localstorage when refresh
    useEffect(() => {
        const productsQty = JSON.parse(localStorage.getItem("productQty"));

        const result = productsQty?.filter((product) => {
            return cartItems.some((item) => product.id === item._id);
        });

        result?.length === 0 ? localStorage.removeItem("productQty") : null;
    }, []);

    useEffect(() => {
        let totalPay = 0;

        const itemsQty = JSON.parse(localStorage.getItem("productQty"));

        cartItems?.forEach((product) => {
            const item = itemsQty?.find((item) => item.id === product._id);

            if (item) {
                totalPay +=
                    item.quantity *
                    (Number(product.price) -
                        Number(product.price) * (product.discount / 100));
            }
        });

        setTotalAmount(totalPay);

        setTriggerQty(0);
    }, [cartItems, triggerQty]);

    const contextValue = useMemo(
        () => ({
            cartItems,
            setCartItems,
            wishlistItems,
            setWishlistItems,
            addToCart,
            addToWishlist,
            removeWishlistItem,
            removeCartItem,
            // getTotalCartAmount,
            triggerQty,
            setTriggerQty,
            totalAmount,
            category,
            setCategory,
            currentUser,

            // isLoading,
            // setIsLoading,
        }),
        [cartItems, wishlistItems, totalAmount, category],
    );

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default memo(ShopContextProvider);
