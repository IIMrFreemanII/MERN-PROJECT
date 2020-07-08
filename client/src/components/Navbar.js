import React, { useContext, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const NAVBAR_ROUTES = {
    LINKS: "/links",
    CREATE: "/create",
    DEFAULT: "/",
};

export const Navbar = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const [value, setValue] = useState(NAVBAR_ROUTES.CREATE);
    const location = useLocation();

    const handleLogOut = (e) => {
        e.preventDefault();
        auth.logOut();
        history.push(NAVBAR_ROUTES.DEFAULT);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const navRouteKeys = Object.values(NAVBAR_ROUTES);
        if (navRouteKeys.includes(location.pathname)) {
            setValue(location.pathname);
        }
    }, [location.pathname]);

    const goToLinks = () => history.push(NAVBAR_ROUTES.LINKS);
    const goToCreate = () => history.push(NAVBAR_ROUTES.CREATE);

    return (
        <Paper square>
            <Grid container justify="center">
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    centered
                >
                    <Tab label="Create" value={NAVBAR_ROUTES.CREATE} onClick={goToCreate}/>
                    <Tab label="Links" value={NAVBAR_ROUTES.LINKS} onClick={goToLinks}/>
                    <Tab label="Log out" value={NAVBAR_ROUTES.DEFAULT} onClick={handleLogOut}/>
                </Tabs>
            </Grid>
        </Paper>
    );
};