import { useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
    const { setAuth, auth } = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {
        if (!auth?.accessToken) {
            refresh().catch((err) => console.error(err));
        }
    }, [auth?.accessToken, refresh, setAuth]);

    return null;
};

export default PersistLogin;
