import React, { Component } from "react";
import BreadTop from "../../../../assets/images/top.png";
import Salad from "../../../../assets/images/salad.png";
import Cheese from "../../../../assets/images/cheese.png";
import Meat from "../../../../assets/images/meat.png";
import BreadBottom from "../../../../assets/images/bottom.png";
import "./Ingredient.css";

class Ingredient extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let ingredient = null;
        switch (this.props.type) {
            case "bread-top":
                ingredient = (
                    <div>
                        <img src={BreadTop} alt="bread-top" />
                    </div>
                );
                break;
            case "bread-bottom":
                ingredient = (
                    <div>
                        <img src={BreadBottom} alt="bread-bottom" />
                    </div>
                );
                break;
            case "salad":
                ingredient = (
                    <div>
                        <img src={Salad} alt="bread-bottom" />
                    </div>
                );
                break;
            case "cheese":
                ingredient = (
                    <div>
                        <img src={Cheese} alt="bread-bottom" />
                    </div>
                );
                break;
            case "meat":
                ingredient = (
                    <div>
                        <img src={Meat} alt="bread-bottom" />
                    </div>
                );
                break;
            default:
                ingredient = null;
        }
        return <div className="Ingredient">{ingredient}</div>;
    }
}

export default Ingredient;
