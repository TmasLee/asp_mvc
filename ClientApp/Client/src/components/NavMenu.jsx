import React, { Component } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { UserMenu } from './UserMenu';
import '../../../css/NavMenu.css';

export class NavMenu extends Component {
    render () {
        const { toggleModal } = this.props;
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" bg="light">
                    <Container>
                        <Navbar.Brand as={Link} to="/">SlothBook?</Navbar.Brand>
                        <ul className="navbar-nav flex-grow">
                            <Nav.Item>
                                <Nav.Link as={Link} className="text-dark" to="/">Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} className="text-dark" to="/aboutme">About Me</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} className="text-dark" to="#" onClick={(e)=>{toggleModal('users')}}>Users</Nav.Link>
                            </Nav.Item>
                            <UserMenu {...this.props}/>
                        </ul>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
