import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import { Formik } from 'formik';

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredient,
        totalPrice: state.totalPrice,
        userId: state.userId,
        token: state.token,
    };
};

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                deliveryAddress: '',
                phone: '',
                paymentType: '',
            },
            message: null,
        };
    }

    inputChangerHandler = (event) => {
        this.setState({
            values: {
                ...this.state.values,
                [event.target.name]: event.target.value,
            },
        });
    };

    render() {
        return (
            <div className="container">
                {this.state.message}
                <h4
                    style={{
                        border: '1px solid grey',
                        boxShadow: '1px 1px #888888',
                        borderRadius: '5px',
                        padding: '20px',
                    }}
                >
                    Payment: {this.props.totalPrice} BDT
                </h4>
                <Formik
                    initialValues={{
                        deliveryAddress: '',
                        phone: '',
                        paymentType: 'Cash on Delivery',
                    }}
                    onSubmit={(values) => {
                        const order = {
                            customer: values,
                            ingredients: this.props.ingredients,
                            price: this.props.totalPrice,
                            date: new Date(),
                            userId: this.props.userId,
                        };
                        axios
                            .post(
                                'https://burger-builder-e7811-default-rtdb.firebaseio.com/order.json?auth=' +
                                    this.props.token,
                                order
                            )
                            .then((res) => {
                                setTimeout(() => {
                                    this.setState({
                                        ...this.state,
                                        message: (
                                            <div className="alert alert-success">
                                                <span>
                                                    Your order successfully
                                                    placed!!!
                                                </span>
                                            </div>
                                        ),
                                    });
                                }, 1500);
                            })
                            .catch((err) => {
                                setTimeout(() => {
                                    this.setState({
                                        ...this.state,
                                        message: (
                                            <div className="alert alert-danger">
                                                <span>
                                                    Sorry!!! Something went
                                                    wrong!!!
                                                </span>
                                            </div>
                                        ),
                                    });
                                }, 1500);
                            });
                    }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.deliveryAddress) {
                            errors.deliveryAddress = 'Required';
                        } else if (!values.phone) {
                            errors.phone = 'Required';
                        } else if (!values.paymentType) {
                            errors.paymentType = 'Required';
                        }

                        if (values.deliveryAddress.length <= 0) {
                            errors.deliveryAddress =
                                'Please add your address...';
                        }
                        if (isNaN(values.phone) && values.phone.length <= 0) {
                            errors.phone = 'Please add a valid phone number...';
                        }
                        return errors;
                    }}
                >
                    {({ values, handleChange, handleSubmit, errors }) => (
                        <form
                            onSubmit={handleSubmit}
                            style={{
                                border: '1px solid grey',
                                boxShadow: '1px 1px #888888',
                                borderRadius: '5px',
                                padding: '20px',
                            }}
                        >
                            <textarea
                                name="deliveryAddress"
                                value={values.deliveryAddress}
                                className="form-control"
                                placeholder="Your Address"
                                onChange={handleChange}
                            ></textarea>
                            <span className="text-danger">
                                {errors.deliveryAddress}
                            </span>
                            <br />
                            <input
                                name="phone"
                                className="form-control"
                                value={values.phone}
                                placeholder="Your Phone Number"
                                onChange={handleChange}
                            />
                            <span className="text-danger">{errors.phone}</span>
                            <br />
                            <select
                                name="paymentType"
                                className="form-control"
                                value={values.paymentType}
                                onChange={handleChange}
                            >
                                <option value="Cash On Delivery">
                                    Cash On Delivery
                                </option>
                                <option value="Bkash">Bkash</option>
                            </select>
                            <span className="text-danger">
                                {errors.paymentType}
                            </span>
                            <br />
                            <Button
                                type="submit"
                                style={{ backgroundColor: '#D70F64' }}
                                className="me-auto"
                            >
                                Place Order
                            </Button>
                            <Button
                                type="button"
                                color="secondary"
                                className="ms-1"
                                onClick={this.goBack}
                            >
                                Cancel
                            </Button>
                        </form>
                    )}
                </Formik>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Checkout);
