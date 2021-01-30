import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

import { NavMenu } from './NavMenu';
import { LoginModal } from "./LoginModal";

export class Layout extends Component {
    state = {
        showModal: false
    }

    // Modal type (login/users) switch?
    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    render () {
        const {handleLogout, setUser, currentUser} = this.props;
        return (
            <div>
                <NavMenu toggleModal={this.toggleModal}
                         logout={handleLogout}
                         currentUser={currentUser}/>
                <LoginModal {...this.state}
                            currentUser={currentUser}
                            setUser={setUser}
                            toggleModal={this.toggleModal}/>
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
