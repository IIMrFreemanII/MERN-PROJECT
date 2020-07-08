import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import { Loader } from "../Loader";
import { LinksList } from "../LinksList";
import Container from "@material-ui/core/Container";

export const LinksPage = () => {
    const [links, setLinks] = useState([]);
    const { loading, request } = useHttp();
    const { token } = useContext(AuthContext);

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request("api/link", "GET", null, {
                Authorization: `Bearer ${token}`,
            });
            setLinks(fetched);
        } catch (e) {

        }
    }, [token, request]);

    useEffect(() => {
        fetchLinks();
    }, [fetchLinks]);

    if (loading) {
        return <Loader/>
    }

    return (
        <>
            <Container maxWidth="lg">
                {!loading && <LinksList links={links}/>}
            </Container>
        </>
    );
};