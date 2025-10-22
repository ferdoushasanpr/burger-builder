import React, { Component, Fragment } from "react";
import BurgerBuilder from "../Burger-builder/BurgerBuilder";
import Orders from "./Orders/Orders";
import Checkout from "./Orders/Checkout/Checkout";
import { Route, Routes, Navigate } from "react-router-dom";
import Auth from "../../auth/Auth";
import { connect } from "react-redux";
import { authCheck } from "../../redux/authCreator";
import Logout from "../../auth/Logout";

const mapStateToProps = (state) => {
    return {
        token: state.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        authCheck: () => dispatch(authCheck()),
    };
};

class Body extends Component {
    componentDidMount() {
        this.props.authCheck();
    }
    render() {
        let routes = null;
        if (this.props.token) {
            routes = (
                <Fragment>
                    <Route exact path="/orders" element={<Orders />} />
                    <Route exact path="/checkout" element={<Checkout />} />
                    <Route exact path="/" element={<BurgerBuilder />} />
                    <Route
                        exact
                        path="/login"
                        element={<Navigate replace to="/" />}
                    />
                    <Route exact path="/logout" element={<Logout />} />
                </Fragment>
            );
        } else {
            routes = (
                <Fragment>
                    <Route exact path="/login" element={<Auth />} />
                    <Route
                        exact
                        path="/"
                        element={<Navigate replace to="/login" />}
                    />
                </Fragment>
            );
        }
        return <Routes>{routes}</Routes>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Body);
