import React from "react";
import { Card, CardBody, CardFooter, CardHeader, Button } from "reactstrap";

const controls = [
    { label: "salad", type: "salad" },
    { label: "cheese", type: "cheese" },
    { label: "meat", type: "meat" },
];

function BuildControls(props) {
    return (
        <div className="d-flex">
            <div
                className="mr-auto ml-5"
                style={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
                {props.label}
            </div>
            <button
                className="btn btn-danger btn-sm m-1"
                onClick={props.lessIngredientHandler}
            >
                -
            </button>
            <button
                className="btn btn-success btn-sm m-1"
                onClick={props.addIngredientHandler}
            >
                +
            </button>
        </div>
    );
}

function Controls(props) {
    return (
        <div className="container ml-md-5" style={{ textAlign: "center" }}>
            <Card
                style={{
                    marginTop: "30px",
                    marginBottom: "30px",
                    textAlign: "center",
                }}
            >
                <CardHeader
                    style={{
                        backgroundColor: "#D70F64",
                        color: "white",
                    }}
                >
                    <h4>Add Ingredients</h4>
                </CardHeader>
                <CardBody>
                    {controls.map((item) => {
                        return (
                            <BuildControls
                                label={item.label}
                                type={item.type}
                                key={Math.random()}
                                addIngredientHandler={() =>
                                    props.addIngredientHandler(item.type)
                                }
                                lessIngredientHandler={() =>
                                    props.lessIngredientHandler(item.type)
                                }
                            />
                        );
                    })}
                </CardBody>
                <CardFooter>
                    <h5>Price: {props.price} BDT</h5>
                    <Button
                        disabled={!props.purchasable}
                        onClick={props.toggleModal}
                    >
                        Order Now
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default Controls;
