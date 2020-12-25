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
        serverError: null
    }

    componentDidMount(){
        // User set here based on session/jwt?
    }

    toggleModal = () => this.setState({ showModal: !this.state.showModal })

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

    // Already existing email error from server
    handleSignUp = (newUser) => {
        this.handleError(null);
        this.setState({loading: true});
        const response = axios.post(
            '/User/SignUp',
            newUser
        ).then((resp) => {
            this.setState({loading: false});
        }).catch(err => {
            this.setState({loading: false});
            this.handleError(err.response.data.error)
        })
    }

    handleError = (error) => {
        if (error){
            this.setState({serverError: eerror});
        } else {
            this.setState({serverError: null})
        }
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
                <Layout showModal={this.state.showModal} toggleModal={this.toggleModal} serverError={this.state.serverError}>
                    <Route exact path='/' component={Home} />
                    <Route path='/aboutme' component={AboutMe} />
                    <Route path='/exercises' component={Exercises} />
                </Layout>
            </UserContext.Provider>
        );
    }
}

export default hot(module)(App);