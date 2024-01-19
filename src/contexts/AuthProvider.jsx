import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState();
    useEffect(() => {
        const interval = setInterval(() => {
            console.log(auth);
        }, 1000);

        return () => clearInterval(interval);
    }, [auth]);
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
