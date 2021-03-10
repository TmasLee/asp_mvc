import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

import { NavMenu } from './NavMenu';
import { ModalSwitch } from './modals';
import Toaster from './Toaster';

export class Layout extends Component {
    state = {
        showModal: false,
        modalType: ''
    }

    toggleModal = (modalType = '') => {
        this.setState({
            showModal: !this.state.showModal,
            modalType: modalType
        });
    }

    render () {
        const { handleLogout, setUser, currentUser, connection } = this.props;
        return (
            <div>
                <NavMenu
                    toggleModal={this.toggleModal}
                    logout={handleLogout}
                    currentUser={currentUser}
                    connection={connection}
                />
                <ModalSwitch
                    {...this.state}
                    currentUser={currentUser}
                    setUser={setUser}
                    connection={connection}
                    toggleModal={this.toggleModal}
                />
                <Toaster connection={connection}/>
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
