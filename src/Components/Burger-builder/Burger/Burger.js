import React, { Component } from "react";
import Ingredient from "./Ingredient/Ingredient";
import "./Burger.css";

class Burger extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let ingredientArr = this.props.ingredient
            .map((item) => {
                let amountArr = [...Array(item.amount).keys()];
                return amountArr.map((_) => (
                    <Ingredient type={item.type} key={Math.random()} />
                ));
            })
            .reduce((arr, element) => {
                return arr.concat(element);
            }, []);
        if (ingredientArr.length == 0) {
            ingredientArr = <div>You must add at least one ingredient...</div>;
        }
        return (
            <div className="Burger">
                <Ingredient type="bread-top" />
                {ingredientArr}
                <Ingredient type="bread-bottom" />
            </div>
        );
    }
}

export default Burger;
