import { axiosPrivate } from "../api/axios";
import { useEffect, useMemo } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    const requestIntercept = useMemo(() => {
        return axiosPrivate.interceptors.request.use(
            (config) => {
                console.log("auth", auth);
                console.log(
                    "Adding Authorization header:",
                    config.headers["Authorization"],
                );
                if (!config.headers["Authorization"]) {
                    config.headers[
                        "Authorization"
                    ] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error),
        );
    }, [auth]);

    const responseIntercept = useMemo(() => {
        return axiosPrivate.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                const previousRequest = error?.config;
                if (error?.response?.status === 403 && !previousRequest?.sent) {
                    previousRequest.sent = true;
                    const newAccessToken = await refresh();
                    previousRequest.headers[
                        "Authorization"
                    ] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(previousRequest);
                }
                return Promise.reject(error);
            },
        );
    }, [auth, refresh]);

    useEffect(() => {
        try {
            return () => {
                axiosPrivate.interceptors.request.eject(requestIntercept);
                axiosPrivate.interceptors.response.eject(responseIntercept);
            };
        } catch (err) {
            console.error("Error in axios private clean up:", err);
        }
    }, [auth, requestIntercept, responseIntercept]);

    return axiosPrivate;
};

export default useAxiosPrivate;
