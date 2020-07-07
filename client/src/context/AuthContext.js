import {createContext} from "react";

const NO_OP = () => {};

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: NO_OP,
    logOut: NO_OP,
    isAuthenticated: false,
});