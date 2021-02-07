import React, { Component, Fragment } from 'react';
import { Alert } from 'react-bootstrap';

export default class ModalMessage extends Component {
    render() {
        const { error = null, response = null } = this.props;
        return (
            <Fragment>
                {
                    error ? <Alert variant="danger">{error}</Alert>
                    : response ? <Alert variant="success">{response}</Alert>
                    : null
                }
            </Fragment>
        )
    }
}