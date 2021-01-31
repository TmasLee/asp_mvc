import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

import { NavMenu } from './NavMenu';
import { ModalSwitch } from './ModalSwitch';

export class Layout extends Component {
    state = {
        showModal: false,
        modalType: ''
    }

    toggleModal = (modalType='') => {
        this.setState({
            showModal: !this.state.showModal,
            modalType: modalType
        });
    }

    render () {
        const {handleLogout, setUser, currentUser} = this.props;
        return (
            <div>
                <NavMenu toggleModal={this.toggleModal}
                         logout={handleLogout}
                         currentUser={currentUser}/>
                <ModalSwitch {...this.state}
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
