import React, { Component } from "react";
import Order from "./Order/Order";
import { fetchOrders } from "../../../redux/actionCreator";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        orders: state.orders,
        token: state.token,
        userId: state.userId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
    };
};

class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
    }
    render() {
        const order = this.props.orders.map((item) => {
            return <Order order={item} key={item.id} />;
        });
        return <div>{order}</div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
