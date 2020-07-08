import React, {useState, useEffect, useContext} from "react";
import Container from "@material-ui/core/Container";
import { Card } from '@material-ui/core';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {useHttp} from "../../hooks/http.hook";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@material-ui/lab/Alert';
import {AuthContext} from "../../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({email: "", password: ""});
    const [showError, setShowError] = useState(false);
    const [createdSuccess, setCreatedSuccess] = useState("");

    useEffect(() => {
        if (error) {
            setShowError(true);
        }
    }, [error]);

    const hideError = () => {
        setShowError(false);
        clearError();
    };

    const hideCreatedSuccess = () => {
        setCreatedSuccess("");
    };

    const handleChange = (e) => {
        const target = e.target;

        setForm({
            ...form,
            [target.name]: target.value,
        });
    };

    const handleRegister = async () => {
        try {
            const data = await request("/api/auth/register", "POST", {...form});
            setCreatedSuccess(data.message);
            console.log("Data", data);
        } catch (e) {}
    };

    const handleLogin = async () => {
        try {
            const data = await request("/api/auth/login", "POST", {...form});
            const {token, userId} = data;
            auth.login(token, userId);
            console.log("Data", data);
        } catch (e) {}
    };

    return (
        <Container maxWidth="lg">
            <Snackbar open={showError} autoHideDuration={6000} onClose={hideError}>
                <Alert onClose={hideError} severity="error" variant="filled">
                    {error}
                </Alert>
            </Snackbar>
            <Snackbar open={!!createdSuccess} autoHideDuration={6000} onClose={hideCreatedSuccess}>
                <Alert onClose={hideCreatedSuccess} severity="success" variant="filled">
                    {createdSuccess}
                </Alert>
            </Snackbar>

            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Auth page
                    </Typography>
                    <div>
                        <div>
                            <TextField
                                label="Email"
                                type="text"
                                name="email"
                                onChange={handleChange}
                                value={form.email}
                            />
                        </div>
                        <div>
                            <TextField
                                label="Password"
                                type="password"
                                name="password"
                                onChange={handleChange}
                                value={form.password}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        disabled={loading}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        onClick={handleRegister}
                        disabled={loading}
                    >
                        Register
                    </Button>
                </CardActions>
            </Card>
        </Container>
    );
};