import React, { Component } from 'react';
import { Route } from 'react-router';
import { hot } from 'react-hot-loader';
import "core-js/stable";
import "regenerator-runtime/runtime";

import authService from './AuthenticationService';
import { Layout } from './components/Layout';
import {
    Home,
    AboutMe,
    User
} from './components/pages';
import '../../css/App.css';

class App extends Component {
    state = {
        currentUser: null,
    }

    async componentDidMount(){
        let user = await authService.retrieveUser();
        this.setUser(user);
    }

    setUser = (user) => {
        this.setState({ currentUser: user });
    }

    handleLogout = () => {
        authService.logout();
        this.setUser(null);
    }

    render(){
        return (
            <Layout setUser={this.setUser}
                    handleLogout={this.handleLogout}
                    {...this.state}>
                <Route exact path='/' component={Home} />
                <Route path='/aboutme' component={AboutMe} />
                <Route path='/user/:id' component={User} />
            </Layout>
        );
    }
}

export default hot(module)(App);