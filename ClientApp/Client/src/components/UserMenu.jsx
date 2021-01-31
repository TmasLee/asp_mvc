import React, { Component, Fragment } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../../../css/NavMenu.css';

export class UserMenu extends Component {
    render () {
        const { toggleModal, currentUser, logout } = this.props;
        return (
            <Fragment>
                {
                    currentUser ?
                    <Nav.Item>
                        <Nav.Link as={Link} className="text-dark" to={`/user/${currentUser.id}`}>{currentUser.firstName}</Nav.Link>
                    </Nav.Item>
                    : null
                }
                <Nav.Item>
                    {
                        currentUser ? <Nav.Link as={Link} className="text-dark" to="/" onClick={logout}>Logout</Nav.Link>
                        :
                        <Nav.Link as={Link} className="text-dark" to="#" onClick={(e)=>{toggleModal('login')}}>Login</Nav.Link>
                    }
                </Nav.Item>
            </Fragment>
        );
    }
}
