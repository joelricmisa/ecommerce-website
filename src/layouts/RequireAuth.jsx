import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks";

const RequireAuth = ({ children }) => {
    const { auth } = useAuth();
    const location = useLocation();

    if (!auth) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;
