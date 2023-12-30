import { useState, createContext, useEffect, memo, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
    useAxiosPrivate,
    useAuth,
    useFeedback,
    useErrorFeedback,
} from "../hooks";
import { computePrice } from "../utils";

export const ShopContext = createContext(0);

const ShopContextProvider = ({ children }) => {
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [triggerQty, setTriggerQty] = useState(0);

    const [totalAmount, setTotalAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();

    const showFeedback = useFeedback();
    const showError = useErrorFeedback();

    const { data: currentUser } = useQuery({
        queryKey: ["currentUser"],

        queryFn: async () => {
            // cart;
            let cartIds = [];
            cartItems?.map((item) => cartIds.push(item));
            localStorage.setItem("cartIds", JSON.stringify(cartIds));
            // wishlist;
            let wishlistIds = [];
            wishlistItems?.map((item) => wishlistIds.push(item._id));
            localStorage.setItem("wishlistIds", JSON.stringify(wishlistIds));

            const response = await axiosPrivate.get("/api/users/current");

            setCartItems([...response?.data?.data?.cart]);

            setWishlistItems([...response?.data?.data?.wishlist]);

            //console.log(response?.data);

            return response?.data?.data;
        },
        enabled: !!auth,
    });

    //CART//CART//CART//CART//CART//CART//CART//CART//CART

    useEffect(() => {
        const cartIds = JSON.parse(localStorage.getItem("cartIds"));
        cartIds?.length > 0 ? updateCartItems(cartIds) : null;
        //console.log(cartItems);

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

            showFeedback(
                "success",
                `Added ${data.product_id.name} to cart successfully`,
                "alert",
            );
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

    const updateCartItems = async (productData, newItem) => {
        if (currentUser) {
            try {
                //console.log(productData);

                // array works only when the user is not logged in and the carts are stored in the  local storage then the user sign up and logged its account. This would automatically update its account's cart data in the live server.
                if (Array.isArray(productData)) {
                    await Promise.all(
                        productData.map(async (item) => {
                            const response = await axiosPrivate.patch(
                                `/api/users/${currentUser?._id}/cart`,
                                JSON.stringify({
                                    product_id: item?.product_id._id,
                                    quantity: item?.quantity,
                                }),
                            );

                            // console.log(
                            //     `Updated item with id ${item.product_id._id}:`,
                            //     response.data,
                            // );
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
                    productData.length > 1
                        ? (name = "multiple items")
                        : (name = "item");

                    setIsLoading(false);
                    showFeedback(
                        "success",
                        `Added ${name} to cart successfully`,
                        "alert",
                    );
                }
                // this updates the cart in the live server when the user is authenticated
                else {
                    const response = await axiosPrivate.patch(
                        `/api/users/${currentUser?._id}/cart`,
                        JSON.stringify({
                            product_id: productData?.product_id?._id,
                            quantity: productData?.quantity,
                        }),
                    );
                    // console.log("Response:", response);

                    queryClient.setQueryData(["currentUser"], response.data);

                    setCartItems([...response.data.cart]);

                    // if this newItem is true, it would run the alerts since its added to cart else the cart item was just updated the quantity
                    if (newItem) {
                        setIsLoading(false);

                        showFeedback(
                            "success",
                            `Added ${productData.product_id.name} to cart successfully`,
                            "alert",
                        );
                    }
                }
            } catch (err) {
                console.log(err);

                showError(err.code);
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
            showFeedback(
                "delete",
                `Removed ${data.name} from cart successfully`,
                "alert",
            );
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
            );

            // console.log("Response:", response);

            queryClient.setQueryData(["currentUser"], response.data);

            setCartItems([...response.data.cart]);

            setIsLoading(false);

            showFeedback(
                "delete",
                `Removed ${name} from cart successfully`,
                "alert",
            );

            return response;
        } catch (error) {
            console.error("Error removing product from cart:", error);

            showError(err.code);
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

        cartItems.map((item) => {
            let price = computePrice(
                item.product_id?.price,
                item.product_id?.discount,
            );

            totalPay += item?.quantity * price;
        });

        setTotalAmount(totalPay);

        setTriggerQty(0);
    }, [cartItems, triggerQty]);

    const contextValue = useMemo(
        () => ({
            cartItems,
            setCartItems,
            addToCart,
            removeCartItem,
            triggerQty,
            setTriggerQty,
            totalAmount,
            currentUser,
            updateItemQty,
            isLoading,
            setIsLoading,
        }),
        // category
        [cartItems, totalAmount, isLoading],
    );

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};

export default memo(ShopContextProvider);
