import React, { Component } from "react";
import "./Header.css";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        token: state.token,
        email: state.email,
    };
};

class Header extends Component {
    render() {
        let email = null;
        let links = null;
        if (this.props.token) {
            email = (
                <span className="text-light lead border border-light p-1">
                    {this.props.email}
                </span>
            );
            links = (
                <NavItem>
                    <NavLink exact="true" to="/" className="NavLink">
                        Burger-Builder
                    </NavLink>
                    <NavLink exact="true" to="/orders" className="NavLink">
                        Order
                    </NavLink>
                    <NavLink exact="true" to="/logout" className="NavLink">
                        Logout
                    </NavLink>
                </NavItem>
            );
        } else {
            links = (
                <NavItem>
                    <NavLink exact="true" to="/login" className="NavLink">
                        Login
                    </NavLink>
                </NavItem>
            );
        }
        return (
            <div className="Navigation">
                <Navbar
                    style={{
                        backgroundColor: "#D70F64",
                        height: "70px",
                    }}
                >
                    <NavbarBrand href="/" className="mr-auto ml-md-5 Brand">
                        <img src={Logo} alt="Logo" width="80px" />
                    </NavbarBrand>
                    {email}
                    <Nav className="mr-md-5">{links}</Nav>
                </Navbar>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Header);
