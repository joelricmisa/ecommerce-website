import { createContext, useEffect, useState } from "react";
import {
    useAuth,
    useAxiosPrivate,
    useErrorFeedback,
    useFeedback,
} from "../hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const WishlistContext = createContext({});

export const WishlistProvider = ({ children }) => {
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const [wishlistItems, setWishlistItems] = useState([]);
    const showFeedback = useFeedback();
    const showError = useErrorFeedback();
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);

    const { data: currentUser } = useQuery({
        queryKey: ["wishlist"],

        queryFn: async () => {
            // wishlist;
            let wishlistIds = [];
            wishlistItems?.map((item) => wishlistIds.push(item._id));
            localStorage.setItem("wishlistIds", JSON.stringify(wishlistIds));

            const response = await axiosPrivate.get("/api/users/current");

            setWishlistItems([...response?.data?.data?.wishlist]);

            //console.log(response?.data);

            return response?.data?.data;
        },
        enabled: !!auth,
    });

    //WISHLIST//WISHLIST//WISHLIST//WISHLIST//WISHLIST//WISHLIST

    useEffect(() => {
        const wishlistIds = JSON.parse(localStorage.getItem("wishlistIds"));
        wishlistIds?.length > 0 ? updateWishlistItems(wishlistIds) : null;
        localStorage.removeItem("wishlistIds");
    }, [currentUser?._id]);

    const addToWishlist = (data) => {
        // console.log(data);
        if (auth) {
            const isItemInList = wishlistItems?.some(
                (item) => item._id === data._id,
            );
            !isItemInList ? updateWishlistItems(data) : "";
        }

        if (!auth) {
            // setIsLoading(false);
            const isItemInList = wishlistItems?.some(
                (item) => item._id === data._id,
            );
            !isItemInList ? setWishlistItems([...wishlistItems, data]) : "";

            setIsLoading(false);

            showFeedback(
                "success",
                `Added ${data.name} to wishlist successfully`,
                "alert",
            );
        }
    };

    const updateWishlistItems = async (productData) => {
        if (currentUser) {
            try {
                if (Array.isArray(productData)) {
                    await Promise.all(
                        productData.map(async (item) => {
                            await axiosPrivate.patch(
                                `/api/users/${currentUser?._id}/wishlist`,
                                JSON.stringify({
                                    product_id: item,
                                }),
                            );
                        }),
                    );

                    const updatedUserData =
                        await axiosPrivate.get("/api/users/current");

                    queryClient.setQueryData(
                        ["wishlist"],
                        updatedUserData.data.data,
                    );
                    setWishlistItems([...updatedUserData.data.data.wishlist]);

                    let name;
                    productData.length > 1
                        ? (name = "multiple items")
                        : (name = "item");

                    setIsLoading(false);
                    showFeedback(
                        "success",
                        `Added ${name} to wishlist successfully`,
                        "alert",
                    );
                } else {
                    const response = await axiosPrivate.patch(
                        `/api/users/${currentUser?._id}/wishlist`,
                        JSON.stringify({
                            product_id: productData?._id,
                        }),
                    );

                    console.log(response);
                    queryClient.setQueryData(["wishlist"], response.data);

                    setWishlistItems([...response.data.wishlist]);

                    setIsLoading(false);

                    showFeedback(
                        "success",
                        `Added ${productData.name} to wishlist successfully`,
                        "alert",
                    );
                }
            } catch (err) {
                console.log(err);

                showError(err.code);
            }
        }
    };

    const removeWishlistItem = (data) => {
        if (auth) {
            removeWishlistItemFromUser(data);
        }

        if (!auth) {
            setIsLoading(false);
            const filtered = wishlistItems.filter(
                (item) => data._id !== item._id,
            );
            setWishlistItems(filtered);

            showFeedback(
                "delete",
                `Removed ${data.name} from wishlist successfully`,
                "alert",
            );
        }
    };

    const removeWishlistItemFromUser = async (productData) => {
        try {
            //
            const response = await axiosPrivate.patch(
                `/api/users/${currentUser?._id}/wishlist/remove`,
                JSON.stringify({
                    product_id: productData._id,
                }),
            );

            queryClient.setQueryData(["wishlist"], response.data);

            setWishlistItems([...response.data.wishlist]);

            setIsLoading(false);

            showFeedback(
                "delete",
                `Removed ${productData.name} from wishlist successfully`,
                "alert",
            );

            return response;
        } catch (error) {
            console.error("Error removing product from wishlist:", error);

            showError(err.code);
        }
    };

    const contextValue = {
        wishlistItems,
        addToWishlist,
        removeWishlistItem,
        setWishlistItems,
        isLoading,
        setIsLoading,
    };
    return (
        <WishlistContext.Provider value={contextValue}>
            {children}
        </WishlistContext.Provider>
    );
};
export default WishlistContext;
