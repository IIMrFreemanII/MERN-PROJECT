import React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Link } from "react-router-dom";
import TableBody from "@material-ui/core/TableBody";

export const LinksList = ({ links }) => {
    if (!links.length) {
        return <p>There are no links.</p>
    }

    return (
        <TableContainer>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell align="left">Original</TableCell>
                        <TableCell align="left">Shortcut</TableCell>
                        <TableCell align="left">Open</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {links.map((link, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">{index + 1}</TableCell>
                            <TableCell align="left">{link.from}</TableCell>
                            <TableCell align="left">{link.to}</TableCell>
                            <TableCell align="left">
                                <Link to={`/detail/${link._id}`}>Open</Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};