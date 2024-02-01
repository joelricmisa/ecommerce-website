import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get("/api/refresh", {
            withCredentials: true,
        });

        const responseData = response?.data?.data;

        // console.log(response);

        setAuth((prev) => {
            return {
                ...prev,
                user: responseData?.user,
                role: responseData?.role,
                accessToken: responseData?.accessToken,
            };
        });
        return responseData?.accessToken;
    };
    return refresh;
};

export default useRefreshToken;
