import React, { Fragment } from 'react';
import { Nav, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../../../css/NavMenu.css';

export function UserMenu(props) {
    const { toggleModal, currentUser, logout } = props;
    let userMenuOptions = null;

    if (currentUser){
        const requestsBadge = <Badge variant="primary">{currentUser.requestCount}</Badge>;
        userMenuOptions = (
            <Fragment>
                <Nav.Item>
                    <Nav.Link as={Link} className="text-dark" to="#" onClick={(e)=>{toggleModal('friends')}}>Friends</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} className="text-dark" to="#" onClick={(e)=>{toggleModal('requests')}}>
                        Requests {requestsBadge}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} className="text-dark" to={`/user/${currentUser.id}`}>{currentUser.firstName}</Nav.Link>
                </Nav.Item>
            </Fragment>
        )
    }

    return (
        <Fragment>
            { userMenuOptions }
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
