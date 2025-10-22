import React from "react";

function Summary(props) {
    const ingredientSummary = props.ingredients.map((item) => (
        <li key={item.type}>
            <span style={{ textTransform: "capitalize" }}>
                {item.type} : {item.amount}
            </span>
        </li>
    ));
    return (
        <div>
            <ul>{ingredientSummary}</ul>
        </div>
    );
}

export default Summary;
