import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import "./scss/index.scss";
import { Loader } from "./components/Loader";

function App() {
    const { token, login, logOut, userId, ready } = useAuth();
    const isAuthenticated = !!token;
    const contextValues = { token, login, logOut, userId, isAuthenticated };
    const routes = useRoutes(isAuthenticated);

    if (!ready) {
        return <Loader/>;
    }

    return (
        <AuthContext.Provider value={contextValues}>
            <Router>
                <div>
                    {isAuthenticated && <Navbar/>}
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
