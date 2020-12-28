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
import { UserContext } from './components/UserContext';

import '../../css/App.css';

// Add loading percentages
class App extends Component {
    state = {
        user: null,
        loading: false,
        showModal: false,
        serverResponse: null,
        serverError: null
    }

    componentDidMount(){
        // User set here based on session/jwt?
    }

    toggleModal = () => {
        this.resetServerResponse();
        this.setState({showModal: !this.state.showModal})
    }

    handleLogin = (user) => {
        this.resetServerResponse();
        this.setState({loading: true});
        axios.post(
            '/User/Login',
            user
        )
        .then((resp) => {
            this.handleServerResponse(resp.data, true);
            return axios.get(
                '/User/ConnectToServices'
            )
        })
        .then((resp) => {
            this.handleServerResponse(resp.data, true)
            return axios.get(
                '/User/LoseData'
            )
        }).then((resp) => {
            this.handleServerResponse(resp.data, true);
            return axios.get(
                '/User/GetUserDatas'
            )
        })
        .then((resp) => {
            this.handleServerResponse("Success!");
            setTimeout(() => {
                this.setState({showModal: false});
                this.resetServerResponse();
            }, 1000);
        })
        .catch((err) => this.handleServerError(err.response.data));
    }

    handleLogout = (e) => {
        e.preventDefault();
    }

    handleSignUp = (newUser) => {
        this.resetServerResponse(null);
        this.setState({loading: true});
        axios.post(
            '/User/SignUp',
            newUser
        )
        .then((resp) => {
            this.handleServerResponse(resp.data);
        })
        .catch((err) => this.handleServerError(err.response.data));
    }

    resetServerResponse = () => {
        this.setState({
            serverResponse: null,
            serverError: null
        });
    }

    handleServerError = (error) => {
        this.setState({
            loading: false,
            serverResponse: null,
            serverError: error
        })
    }

    handleServerResponse = (resp, stillLoading = false) => {
        this.setState({
            loading: stillLoading ? true : false,
            serverResponse: resp,
            serverError: null
        });
    }

    render(){
        const user = {
            currentUser: this.state.user,
            loginUser: this.handleLogin,
            logoutUser: this.handleLogout,
            signUpUser: this.handleSignUp
        }

        return(
            <UserContext.Provider value={user}>
                <Layout {...this.state} toggleModal={this.toggleModal}>
                    <Route exact path='/' component={Home} />
                    <Route path='/aboutme' component={AboutMe} />
                    <Route path='/exercises' component={Exercises} />
                </Layout>
            </UserContext.Provider>
        );
    }
}

export default hot(module)(App);