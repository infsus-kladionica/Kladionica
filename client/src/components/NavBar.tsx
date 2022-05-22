import { userInfo } from "os";
import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

import {emptyUser, IUser} from "../types/User";

type NavBarProps = {
    user: IUser
    updateUser: (arg: IUser) => void
};

const NavBar: React.FC<NavBarProps> = (props) => {
    const navigate = useNavigate();
    const handleLogOut = () => {
        props.updateUser(emptyUser)
        navigate("/")
    };

    return (
        <Navbar collapseOnSelect bg="light" expand="lg">
            <Container>
                <NavLink to="/">
                    <Navbar.Brand href="/">Kladionica</Navbar.Brand>
                </NavLink>
                {props.user.id == "" ? 
                    (
                        <>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/login">Login</Nav.Link>
                                    <Nav.Link href="/register">Register</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </>
                    )
                    : 
                    (
                        <>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/profile">{props.user.korisnicko_ime}</Nav.Link>
                                    <Nav.Link onClick={() => handleLogOut()}>Log Out</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </>
                    )
                }
            </Container>
        </Navbar>
    );
}

export default NavBar;