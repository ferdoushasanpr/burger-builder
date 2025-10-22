import React, { Component } from "react";
import Burger from "./Burger/Burger";
import Controls from "./Controls/Controls";
import Summary from "./Summary/Summary";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
    addIngredient,
    removeIngredient,
    updatePurchasable,
} from "../../redux/actionCreator";

const mapStateToProps = (state) => {
    return {
        ingredient: state.ingredient,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredient: (type) => dispatch(addIngredient(type)),
        removeIngredient: (type) => dispatch(removeIngredient(type)),
        updatePurchasable: () => dispatch(updatePurchasable()),
    };
};

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            purchasable: false,
        };
    }

    addIngredientHandler = (type) => {
        this.props.addIngredient(type);
        this.props.updatePurchasable();
    };

    lessIngredientHandler = (type) => {
        this.props.removeIngredient(type);
        this.props.updatePurchasable();
    };

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen,
        });
    };

    render() {
        return (
            <div>
                <div className="d-flex flex-md-row flex-column">
                    <Burger ingredient={this.props.ingredient} />
                    <Controls
                        price={this.props.totalPrice}
                        addIngredientHandler={this.addIngredientHandler}
                        lessIngredientHandler={this.lessIngredientHandler}
                        toggleModal={this.toggleModal}
                        purchasable={this.props.purchasable}
                    />
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Your Order Summary</ModalHeader>
                    <ModalBody>
                        <h5>
                            Total Price: {this.props.totalPrice.toFixed(0)} BDT
                        </h5>
                        <Summary ingredients={this.props.ingredient} />
                    </ModalBody>
                    <ModalFooter>
                        <Link
                            exact="true"
                            to="/checkout"
                            className="btn btn-md btn-success"
                        >
                            Continue to Checkout
                        </Link>
                        <Button color="secondary" onClick={this.toggleModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
