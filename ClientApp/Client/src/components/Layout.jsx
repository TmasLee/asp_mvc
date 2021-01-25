import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

import { NavMenu } from './NavMenu';
import { LoginModal } from "./LoginModal";
import authService from '../AuthenticationService';

// TODO: Get logged in view with no rerendering when landing on site - Index would need to be an authenticated view
// TODO: Logged in page title update to user's first name
// TODO: Need to handle csrf token config handling on app level
export class Layout extends Component {
    state = {
        showModal: false,
        currentUser: null,
    }

    async componentDidMount(){
        let user = await authService.retrieveUser();
        this.setUser(user);
    }

    // Modal type (login/users) switch?
    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    setUser = (user) => {
        this.setState({ currentUser: user });
    }

    handleLogout = () => {
        authService.logout();
        this.setUser(null);
    }

    render () {
        return (
            <div>
                <NavMenu toggleModal={this.toggleModal}
                         logout={this.handleLogout}
                         currentUser={this.state.currentUser}/>
                <LoginModal {...this.state}
                            setUser={this.setUser}
                            toggleModal={this.toggleModal}/>
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
