import React, { useContext } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import { useQueryClient } from "@tanstack/react-query";
import FeedbackContext from "../contexts/FeedbackProvider";
import useFeedback from "./useFeedback";
import useErrorFeedback from "./useErrorFeedback";

const useLogout = () => {
    const axiosPrivate = useAxiosPrivate();
    const { auth, setAuth } = useAuth();
    const { setCartItems, setWishlistItems } = useContext(ShopContext);
    const { setShowLoadingOverlay, setLoadingMessage } =
        useContext(FeedbackContext);

    const showFeedback = useFeedback();
    const showError = useErrorFeedback();

    const LOGOUT_URL = "/api/logout";
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const handleLogout = async () => {
        setLoadingMessage("Logging Out");
        setShowLoadingOverlay(true);

        setTimeout(async () => {
            try {
                //console.log("trigger logout");
                const response = await axiosPrivate.post(LOGOUT_URL);

                //console.log(response?.data);

                setAuth(null);
                setCartItems([]);
                setWishlistItems([]);
                queryClient.clear();
                setShowLoadingOverlay(false);

                navigate("/signin", { replace: true });

                showFeedback(
                    "info",
                    `Logout ${auth?.user} successfully!`,
                    "alert",
                );
            } catch (err) {
                console.log(err);

                showError(err.code);
            }
        }, 1000);
    };

    return handleLogout;
};

export default useLogout;
