import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/authCreator";

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
    };
};

class Logout extends Component {
    componentDidMount() {
        this.props.logout();
    }
    render() {
        return (
            <div>
                <Navigate to="/login" replace />
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(Logout);
