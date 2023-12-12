import React, { useContext } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import { useQueryClient } from "@tanstack/react-query";
import FeedbackContext from "../contexts/FeedbackProvider";

const useLogout = () => {
    const axiosPrivate = useAxiosPrivate();
    const { setAuth } = useAuth();
    const { setCartItems, setWishlistItems } = useContext(ShopContext);
    const { setType, setShowAlert, setMessage } = useContext(FeedbackContext);

    const LOGOUT_URL = "/api/logout";
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const handleLogout = async ({ email }) => {
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

            navigate("/", { replace: true });

            setType("info");
            setShowAlert(true);
            setMessage(`Logout ${email} successfully!`);
        } catch (err) {
            console.log(err);
        }
    };

    return handleLogout;
};

export default useLogout;
