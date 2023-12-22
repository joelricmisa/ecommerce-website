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
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();
    const { setMessage, setShowAlert, setType, setModalMessage, setShowModal } =
        useContext(FeedbackContext);

    const { data: currentUser } = useQuery({
        queryKey: ["currentUser"],

        queryFn: async () => {
            // cart;
            let cartIds = [];
            cartItems?.map((item) => cartIds.push(item));
            localStorage.setItem("cartIds", JSON.stringify(cartIds));
            // wishlist;
            // let wishlistIds = [];
            // wishlistItems?.map((item) => wishlistIds.push(item._id));
            // localStorage.setItem("wishlistIds", JSON.stringify(wishlistIds));

            const response = await axiosPrivate.get("/api/users/current");
            setCartItems([...response?.data?.data?.cart]);

            // getCartProducts(response?.data?.data?.cart);
            console.log(response);

            // getWishlistProducts(response?.data?.data?.wishlist);

            console.log(response?.data);
            // setIsLoading(false);
            return response?.data?.data;
        },
        enabled: !!auth,
    });

    useEffect(() => {
        console.log(currentUser);
    }, [currentUser]);
    //CART//CART//CART//CART//CART//CART//CART//CART//CART

    useEffect(() => {
        const cartIds = JSON.parse(localStorage.getItem("cartIds"));
        cartIds?.length > 0 ? updateCartItems(cartIds) : null;
        console.log(cartItems);

        localStorage.removeItem("cartIds");
    }, [currentUser?._id]);

    const updateItemQty = (data) => {
        if (auth) {
            updateCartItems(data);
        }

        if (!auth) {
            const currentProduct = cartItems?.findIndex(
                (item) => item.product_id._id === data._id,
            );

            cartItems[currentProduct].quantity = data.quantity;

            setCartItems([...cartItems]);
        }
    };

    const addToCart = (data) => {
        if (auth) {
            updateCartItems(data, true);
        }

        if (!auth) {
            const isItemInList = cartItems?.some(
                (item) => item.product_id._id === data._id,
            );

            !isItemInList
                ? setCartItems([
                      ...cartItems,
                      {
                          product_id: data.product_id,
                          quantity: data.quantity,
                          price: data.price,
                      },
                  ])
                : null;

            setIsLoading(false);
            setType("success");
            setShowAlert(true);
            setMessage(`Added ${data.product_id.name} to cart successfully`);
        }

        // localstorage quantity
        const itemQty = localStorage.getItem("productQty");

        const productsQty = itemQty ? JSON.parse(itemQty) : [];

        const productIndex = productsQty.findIndex((item) => {
            return item._id === data._id;
        });

        if (productIndex !== -1) {
            productsQty.splice(productIndex, 1, {
                _id: data.product_id._id,
                quantity: data.quantity,
            });
        } else {
            productsQty.push({
                _id: data.product_id._id,
                quantity: data.quantity,
            });
        }

        localStorage.setItem("productQty", JSON.stringify(productsQty));

        // console.log(productsQty);
    };

    const updateCartItems = async (data, newItem) => {
        if (currentUser) {
            try {
                console.log(data);

                // array works only when the user is not logged in and the carts are stored in the  local storage then the user sign up and logged its account. This would automatically update its account's cart data in the live server.
                if (Array.isArray(data)) {
                    await Promise.all(
                        data.map(async (item) => {
                            const response = await axiosPrivate.patch(
                                `/api/users/${currentUser?._id}/cart`,
                                JSON.stringify({
                                    product_id: item?.product_id._id,
                                    quantity: item?.quantity,
                                }),
                                {
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    withCredentials: true,
                                },
                            );

                            console.log(
                                `Updated item with id ${item.product_id._id}:`,
                                response.data,
                            );
                        }),
                    );

                    const updatedUserData =
                        await axiosPrivate.get("/api/users/current");

                    queryClient.setQueryData(
                        ["currentUser"],
                        updatedUserData.data.data,
                    );
                    setCartItems([...updatedUserData.data.data.cart]);

                    let name;
                    data.length > 1
                        ? (name = "multiple items")
                        : (name = "item");

                    setIsLoading(false);
                    setType("success");
                    setShowAlert(true);
                    setMessage(`Added ${name} to cart successfully`);
                }
                // this updates the cart in the live server when the user is authenticated
                else {
                    const response = await axiosPrivate.patch(
                        `/api/users/${currentUser?._id}/cart`,
                        JSON.stringify({
                            product_id: data?.product_id._id,
                            quantity: data?.quantity,
                        }),
                        {
                            headers: { "Content-Type": "application/json" },
                            withCredentials: true,
                        },
                    );
                    // console.log("Response:", response);

                    queryClient.setQueryData(["currentUser"], response.data);

                    setCartItems([...response.data.cart]);

                    // if this newItem is true, it would run the alerts since its added to cart else the cart item was just updated the quantity
                    if (newItem) {
                        setIsLoading(false);
                        setType("success");
                        setShowAlert(true);
                        setMessage(
                            `Added ${data.product_id.name} to cart successfully`,
                        );
                    }
                }
            } catch (err) {
                console.log(err);

                if (err.code === "ERR_NETWORK") {
                    setType("error");
                    setShowModal(true);
                    setModalMessage(
                        "Something went wrong with your network connection. Please try again once your connection is stable. ",
                    );
                }

                if (err.code === "ERR_BAD_RESPONSE") {
                    setType("error");
                    setShowModal(true);
                    setModalMessage(
                        "Our server is experiencing an issue. You may try again later, once we have resolved our server issue.",
                    );
                }
            }
        }
    };

    const removeCartItem = (data) => {
        if (auth) {
            removeCartItemFromUser(data._id, data.name);
        }

        if (!auth) {
            const filtered = cartItems.filter(
                (item) => data._id !== item.product_id._id,
            );
            setCartItems(filtered);

            setIsLoading(false);
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
    const removeCartItemFromUser = async (productId, name) => {
        try {
            //

            //
            const response = await axiosPrivate.patch(
                `/api/users/${currentUser?._id}/cart/remove`,
                JSON.stringify({
                    product_id: productId,
                }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                },
            );

            console.log("Response:", response);

            queryClient.setQueryData(["currentUser"], response.data);

            setCartItems([...response.data.cart]);

            setIsLoading(false);

            setType("delete");
            setShowAlert(true);
            setMessage(`Removed ${name} from cart successfully`);

            return response;
        } catch (error) {
            console.error("Error removing product from cart:", error);

            if (err.code === "ERR_NETWORK") {
                setType("error");
                setShowModal(true);
                setModalMessage(
                    "Something went wrong with your network connection. Please try again once your connection is stable. ",
                );
            }

            if (err.code === "ERR_BAD_RESPONSE") {
                setType("error");
                setShowModal(true);
                setModalMessage(
                    "Our server is experiencing an issue. You may try again later, once we have resolved our server issue.",
                );
            }
        }
    };

    //WISHLIST//WISHLIST//WISHLIST//WISHLIST//WISHLIST//WISHLIST

    useEffect(() => {
        const wishlistIds = JSON.parse(localStorage.getItem("wishlistIds"));
        wishlistIds?.length > 0
            ? updateWishlistItems(
                  wishlistIds,
                  wishlistIds.length > 1 ? "multiple items" : "item",
              )
            : null;
        localStorage.removeItem("wishlistIds");
    }, [currentUser?._id]);

    const addToWishlist = (data) => {
        if (auth) {
            const isItemInList = wishlistItems?.some(
                (item) => item._id === data._id,
            );
            !isItemInList ? updateWishlistItems([data._id], data.name) : "";
        }

        if (!auth) {
            // setIsLoading(false);
            const isItemInList = wishlistItems?.some(
                (item) => item._id === data._id,
            );
            !isItemInList ? setWishlistItems([...wishlistItems, data]) : "";

            setIsLoading(false);
            setType("success");
            setShowAlert(true);
            setMessage(`Added ${data.name} to wishlist successfully`);
        }
    };

    const updateWishlistItems = async (newWishlistItems, name) => {
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

                queryClient.setQueryData(["currentUser"], response.data.data);

                setWishlistItems([...response.data.data.wishlist]);
                setIsLoading(false);

                setType("success");
                setShowAlert(true);
                setMessage(`Added ${name} to wishlist successfully`);

                // console.log("Response:", response.data);
                // queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            } catch (err) {
                console.log(err);

                if (err.code === "ERR_NETWORK") {
                    setType("error");
                    setShowModal(true);
                    setModalMessage(
                        "Something went wrong with your network connection. Please try again once your connection is stable. ",
                    );
                }

                if (err.code === "ERR_BAD_RESPONSE") {
                    setType("error");
                    setShowModal(true);
                    setModalMessage(
                        "Our server is experiencing an issue. You may try again later, once we have resolved our server issue.",
                    );
                }
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
            removeWishlistItemFromUser(data._id, data.name);
        }

        if (!auth) {
            setIsLoading(false);
            const filtered = wishlistItems.filter(
                (item) => data._id !== item._id,
            );
            setWishlistItems(filtered);

            setType("delete");
            setShowAlert(true);
            setMessage(`Removed ${data.name} from wishlist successfully`);
        }
    };

    const removeWishlistItemFromUser = async (productId, name) => {
        try {
            const response = await axiosPrivate.put(
                `/api/users/${currentUser?._id}/remove-from-wishlist/${productId}`,
                {},
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                },
            );

            queryClient.setQueryData(["currentUser"], response.data.data);

            setWishlistItems([...response.data.data.wishlist]);
            setIsLoading(false);

            setType("delete");
            setShowAlert(true);
            setMessage(`Removed ${name} from wishlist successfully`);

            return response;
        } catch (error) {
            console.error("Error removing product from wishlist:", error);

            if (err.code === "ERR_NETWORK") {
                setType("error");
                setShowModal(true);
                setModalMessage(
                    "Something went wrong with your network connection. Please try again once your connection is stable. ",
                );
            }

            if (err.code === "ERR_BAD_RESPONSE") {
                setType("error");
                setShowModal(true);
                setModalMessage(
                    "Our server is experiencing an issue. You may try again later, once we have resolved our server issue.",
                );
            }
        }
    };

    //clean up localstorage when refresh
    useEffect(() => {
        const productsQty = JSON.parse(localStorage.getItem("productQty"));

        const result = productsQty?.filter((product) => {
            return cartItems.some((item) => product.id === item._id);
        });
        // console.log(result);
        result?.length === 0 ? localStorage.removeItem("productQty") : null;
    }, [cartItems]);

    useEffect(() => {
        let totalPay = 0;

        cartItems.map(
            (item) =>
                (totalPay +=
                    item.quantity *
                    (item.product_id.price -
                        item.product_id.price *
                            (item.product_id.discount / 100))),
        );

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
            updateItemQty,
            isLoading,
            setIsLoading,
        }),
        [cartItems, wishlistItems, totalAmount, category, isLoading],
    );

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default memo(ShopContextProvider);
