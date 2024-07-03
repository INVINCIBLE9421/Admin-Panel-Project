import React, { useState, useEffect, useContext } from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (username) => {
        window.localStorage.setItem('loginStatus', 'true');
        setUser(username);
    };

    const logout = () => {
        window.localStorage.setItem('loginStatus', 'false');
        setUser(null);
    };

    useEffect(() => {
        const status = window.localStorage.getItem('loginStatus');
        if (status === "true") {
            setUser("Admin");
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
