import React, { Component, Fragment } from 'react';
import { Alert } from 'react-bootstrap';

export class LoginMessage extends Component {
    render() {
        const { serverResponse, serverError } = this.props;
        return (
            <Fragment>
                {
                    serverError ? <Alert variant="danger">{serverError}</Alert>
                    : serverResponse ? <Alert variant="success">{serverResponse}</Alert>
                    : null
                }
            </Fragment>
        )
    }
}