import React, { Component } from "react";
import { Route } from "react-router";
import { hot } from "react-hot-loader";

import { Layout } from "./components/Layout";
import { Home } from "./components/pages/Home";
import "../css/App.css";

class App extends Component {
    render(){
        return(
            <Layout>
                <Route exact path='/' component={Home} />
            </Layout>
        );
    }
}

export default hot(module)(App);