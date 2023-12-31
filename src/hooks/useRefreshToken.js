import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get("/api/refresh", {
            withCredentials: true,
        });

        setAuth((prev) => {
            // console.log(response?.data?.accessToken);
            return {
                ...prev,
                user: response?.data?.user,
                role: response?.data?.role,
                accessToken: response?.data?.accessToken,
            };
        });
        return response?.data?.accessToken;
    };
    return refresh;
};

export default useRefreshToken;
