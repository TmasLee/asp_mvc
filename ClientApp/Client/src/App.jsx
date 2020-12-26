import React, { Component } from 'react';
import { Route } from 'react-router';
import { hot } from 'react-hot-loader';
import axios from 'axios';

import { Layout } from './components/Layout';
import {
    Home,
    AboutMe,
    Exercises
} from './components/pages';
import { UserContext } from './components/UserContext';

import '../../css/App.css';

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

    /**
     * 5-10 second load
     * Determine # of loading increments (4-8) - Increments 1-3 --> "Authenticating" + "Connecting to services" + "Getting user datas"
     * Randomly determine which increment (increments 4-8) will be progress lost --> "Woah looks like we lost some progress, terrible UX" + "Better not log off... no really, I coded this to do this everytime you log in"
     * Randomly determine % of each increment
     */
    // Incorrect user/password error
    // Async not working - need plugin?
    handleLogin = () => {
        this.setState({loading: true});
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
        ).then((resp) => {
            this.fakeLoadTime(2000).then(val => {
                this.setState({
                    loading: false,
                    serverResponse: resp.data
                });
            })
        }).catch(err => {
            const error = err.response.data;
            this.setState({
                loading: false,
                serverError: error
            });
        })
    }

    resetServerResponse = () => {
        this.setState({
            serverResponse: null,
            serverError: null
        });
    }

    fakeLoadTime = (delay) => {
        return new Promise(res => setTimeout(res, delay));
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