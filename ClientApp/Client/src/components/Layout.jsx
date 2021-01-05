import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

import { NavMenu } from './NavMenu';
import { LoginModal } from "./LoginModal";

export class Layout extends Component {
    state = {
        showModal: false
    }

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    render () {
        return (
            <div>
                <NavMenu {...this.props} toggleModal={this.toggleModal}/>
                <LoginModal {...this.props}
                            {...this.state}
                            toggleModal={this.toggleModal}/>
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
