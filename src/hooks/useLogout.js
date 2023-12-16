import React, { useContext } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import { useQueryClient } from "@tanstack/react-query";
import FeedbackContext from "../contexts/FeedbackProvider";

const useLogout = () => {
    const axiosPrivate = useAxiosPrivate();
    const { auth, setAuth } = useAuth();
    const { setCartItems, setWishlistItems } = useContext(ShopContext);
    const {
        setType,
        setShowAlert,
        setMessage,
        setShowModal,
        setModalMessage,
        setShowLoadingOverlay,
        setLoadingMessage,
    } = useContext(FeedbackContext);

    const LOGOUT_URL = "/api/logout";
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const handleLogout = async () => {
        setLoadingMessage("Logging Out");
        setShowLoadingOverlay(true);

        setTimeout(async () => {
            try {
                console.log("trigger logout");
                const response = await axiosPrivate.post(LOGOUT_URL, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });

                console.log(response?.data);

                setAuth(null);
                setCartItems([]);
                setWishlistItems([]);
                queryClient.clear();
                setShowLoadingOverlay(false);

                navigate("/signin", { replace: true });

                setType("info");
                setShowAlert(true);
                setMessage(`Logout ${auth?.user} successfully!`);
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
        }, 1000);
    };

    return handleLogout;
};

export default useLogout;
