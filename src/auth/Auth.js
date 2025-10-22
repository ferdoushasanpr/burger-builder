import React, { Component } from "react";
import { Formik } from "formik";
import { authUser } from "../redux/authCreator";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        error: state.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        authUser: (email, password, mode) =>
            dispatch(authUser(email, password, mode)),
    };
};

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "sign-up",
        };
    }
    handleSwitchMode = () => {
        this.setState({
            mode: this.state.mode === "sign-up" ? "login" : "sign-up",
        });
    };
    render() {
        let alert = null;
        if (this.props.error) {
            alert = (
                <div className="alert alert-danger">{this.props.error}</div>
            );
        }
        return (
            <div className="container">
                <h1>{this.state.mode === "sign-up" ? "Sign Up" : "Login"}</h1>
                {alert}
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                        passwordConfirm: "",
                    }}
                    onSubmit={(values) =>
                        this.props.authUser(
                            values.email,
                            values.password,
                            this.state.mode
                        )
                    }
                    validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = "Required";
                        } else if (!values.password) {
                            errors.password = "Required";
                        }

                        if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                values.email
                            )
                        ) {
                            errors.email = "Invalid Email";
                        }
                        if (values.password.length <= 5) {
                            errors.password =
                                "Your password should be at least 6 characters";
                        }
                        if (this.state.mode === "sign-up") {
                            if (!values.passwordConfirm) {
                                errors.passwordConfirm = "Required";
                            }
                            if (values.password !== values.passwordConfirm) {
                                errors.passwordConfirm =
                                    "Password is not matched";
                            }
                        }
                        return errors;
                    }}
                >
                    {({ values, handleSubmit, handleChange, errors }) => (
                        <div
                            style={{
                                border: "1px grey solid",
                                padding: "15px",
                                borderRadius: "7px",
                            }}
                            className="container"
                        >
                            <form onSubmit={handleSubmit}>
                                <div className="row justify-content-center">
                                    <div className="col-8 m-2">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            placeholder="Email"
                                            value={values.email}
                                            onChange={handleChange}
                                        />
                                        <span className="text-danger">
                                            {errors.email}
                                        </span>
                                    </div>
                                    <div className="col-8 m-2">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="Password"
                                            value={values.password}
                                            onChange={handleChange}
                                        />
                                        <span className="text-danger">
                                            {errors.password}
                                        </span>
                                    </div>
                                    {this.state.mode === "sign-up" ? (
                                        <div className="col-8 m-2">
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="passwordConfirm"
                                                placeholder="Confirm Your Password"
                                                value={values.passwordConfirm}
                                                onChange={handleChange}
                                            />
                                            <span className="text-danger">
                                                {errors.passwordConfirm}
                                            </span>
                                        </div>
                                    ) : null}
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-md btn-secondary"
                                >
                                    {this.state.mode === "sign-up"
                                        ? "Sign Up"
                                        : "Login"}
                                </button>
                            </form>
                        </div>
                    )}
                </Formik>
                <span onClick={this.handleSwitchMode}>
                    {this.state.mode === "sign-up"
                        ? "Have already an account? Login here..."
                        : "Don't have any account? Sign up here..."}
                </span>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
