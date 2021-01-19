import React, { Component } from 'react';
import { Route } from 'react-router';
import { hot } from 'react-hot-loader';
import "core-js/stable";
import "regenerator-runtime/runtime";

import { Layout } from './components/Layout';
import {
    Home,
    AboutMe,
    Exercises
} from './components/pages';
import '../../css/App.css';
import authService from './AuthenticationService';

// TODO: Get logged in view with no rerendering
class App extends Component {
    state = {
        currentUser: null
    }

    async componentDidMount(){
        let user = await authService.getUser();
        this.setState({
            currentUser: user
        });
    }

    render(){
        return(
            <Layout {...this.state}>
                <Route exact path='/' component={Home} />
                <Route path='/aboutme' component={AboutMe} />
                <Route path='/exercises' component={Exercises} />
            </Layout>
        );
    }
}

export default hot(module)(App);