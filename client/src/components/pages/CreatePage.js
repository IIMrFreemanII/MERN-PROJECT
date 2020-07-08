import React, { useContext, useState } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

export const CreatePage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const { request } = useHttp();
    const [link, setLink] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setLink(value);
    };
    const handleEnterPress = async (e) => {
        if (e.key === "Enter") {
            try {
                const data = await request("/api/link/generate", "POST", { from: link }, {
                    Authorization: `Bearer ${auth.token}`,
                });
                console.log(data);
                history.push(`/detail/${data.link._id}`);
            } catch (e) {
            }
        }
    };

    return (
        <Container maxWidth="lg">
            <div>Create page</div>
            <div>
                <TextField
                    label="Enter link"
                    type="text"
                    name="link"
                    onChange={handleChange}
                    onKeyPress={handleEnterPress}
                    fullWidth
                    value={link}
                />
            </div>
        </Container>
    );
};