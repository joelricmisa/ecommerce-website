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
        wishlistIds?.length > 0
            ? updateWishlistItems(
                  wishlistIds,
                  wishlistIds.length > 1 ? "multiple items" : "item",
              )
            : null;
        localStorage.removeItem("wishlistIds");
    }, [currentUser?._id]);

    const addToWishlist = (data) => {
        console.log(data);
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

            showFeedback(
                "success",
                `Added ${data.name} to wishlist successfully`,
                "alert",
            );
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
                );

                queryClient.setQueryData(["wishlist"], response.data.data);

                setWishlistItems([...response.data.data.wishlist]);
                setIsLoading(false);

                showFeedback(
                    "success",
                    `Added ${name} to wishlist successfully`,
                    "alert",
                );
            } catch (err) {
                console.log(err);

                showError(err.code);
            }
        }
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

            showFeedback(
                "delete",
                `Removed ${data.name} from wishlist successfully`,
                "alert",
            );
        }
    };

    const removeWishlistItemFromUser = async (productId, name) => {
        try {
            const response = await axiosPrivate.put(
                `/api/users/${currentUser?._id}/remove-from-wishlist/${productId}`,
                {},
            );

            queryClient.setQueryData(["wishlist"], response.data.data);

            setWishlistItems([...response.data.data.wishlist]);
            setIsLoading(false);

            showFeedback(
                "delete",
                `Removed ${name} from wishlist successfully`,
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
