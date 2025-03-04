import React from "react";
import { useAuth } from "./auth";
import { Navigate } from "react-router-dom";

export function PrivateRouter({ children }) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to='/login' />;
    }

    return children;
}
