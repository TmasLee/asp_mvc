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

// Incorrect user/password error or already existing email error from server
class App extends Component {
    state = {
        user: null,
        loading: false,
        showModal: false,
        serverError: null
    }

    componentDidMount(){

    }

    toggleModal = () => this.setState({ showModal: !this.state.showModal })

    handleLogin = () => {
        console.log('log in')
    }

    handleLogout = (e) => {
        e.preventDefault();
    }

    // If success close modal
    handleSignUp = (e) => {
        this.handleError(null);
        console.log('sign up')
        // axios.post(
        //     '/User/SignUp',
        //     {

        //     }
        // )
    }

    handleError = (error) => {
        if (error){
            this.setState({serverError: error.response.data.error});
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