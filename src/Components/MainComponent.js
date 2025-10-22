import React, { Component } from "react";
import Header from "./Header/Header";
import Body from "./Body/Body";
import Footer from "./Footer/Footer";
import { BrowserRouter as Router } from "react-router-dom";

class MainComponent extends Component {
    render() {
        return (
            <Router>
                <Header />
                <Body />
                <Footer />
            </Router>
        );
    }
}

export default MainComponent;
