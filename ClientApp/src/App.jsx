import React, { Component } from "react";
import { Route } from "react-router";
import { hot } from "react-hot-loader";

import { Layout } from "./components/Layout";
import {
    Home,
    AboutMe,
    Exercises,
    Library,
    Upload,
    Results
} from "./components/pages";

import "../css/App.css";

class App extends Component {
    render(){
        return(
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/aboutme' component={AboutMe} />
                <Route path='/exercises' component={Exercises} />
                <Route path='/library' component={Library} />
                <Route path='/upload' component={Upload} />
                <Route path='/results' component={Results} />
            </Layout>
        );
    }
}

export default hot(module)(App);