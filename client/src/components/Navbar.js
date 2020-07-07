import React, {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

export const Navbar = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const [value, setValue] = useState(0);

    const handleLogOut = (e) => {
        e.preventDefault();
        auth.logOut();
        history.push("/");
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const goToLinks = () => history.push("/links");
    const goToCreate = () => history.push("/create");

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
                    <Tab label="Create" onClick={goToCreate}/>
                    <Tab label="Links" onClick={goToLinks}/>
                    <Tab label="Log out" onClick={handleLogOut}/>
                </Tabs>
            </Grid>
        </Paper>
    );
};