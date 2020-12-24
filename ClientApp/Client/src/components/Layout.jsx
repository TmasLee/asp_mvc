import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

import { NavMenu } from './NavMenu';
import { LoginModal } from "./LoginModal";
import { UserContext } from './UserContext';

export class Layout extends Component {
    render () {
        const { toggleModal } = this.props;
        return (
            <UserContext.Consumer>
                {({currentUser, loginUser, logoutUser, signUpUser}) => {
                    return (
                        <div>
                            <NavMenu currentUser={currentUser} toggleLogin={toggleModal}/>
                            <LoginModal {...this.props}
                                        handleLogin={loginUser}
                                        handleLogout={logoutUser}
                                        handleSignUp={signUpUser}/>
                            <Container>
                                {this.props.children}
                            </Container>
                        </div>
                    )
                }}
            </UserContext.Consumer>
        );
    }
}
