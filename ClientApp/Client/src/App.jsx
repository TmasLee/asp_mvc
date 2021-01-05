import React, { Component } from 'react';
import { Route } from 'react-router';
import { hot } from 'react-hot-loader';
import axios from 'axios';
import "core-js/stable";
import "regenerator-runtime/runtime";

import { Layout } from './components/Layout';
import {
    Home,
    AboutMe,
    Exercises
} from './components/pages';
import '../../css/App.css';

class App extends Component {
    state = {
        currentUser: null
    }

    componentDidMount(){
        // Check if session cookie not expired
        // axios.get(
        //     '/User/GetUserDatas', {
        //     withCredentials: true
        // });
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