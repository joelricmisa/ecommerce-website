import React from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const LOGOUT_URL = "/api/logout";

    const handleLogout = async () => {
        try {
            console.log("trigger logout");
            const response = await axiosPrivate.post(LOGOUT_URL, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            console.log(response?.data);
            setAuth(null);
            navigate("/", { replace: true });
        } catch (err) {
            console.log(err);
        }
    };

    return handleLogout;
};

export default useLogout;
