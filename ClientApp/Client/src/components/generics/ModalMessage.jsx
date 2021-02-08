import React, { Fragment } from 'react';
import { Alert } from 'react-bootstrap';

export function ModalMessage({ error = null, response = null }){
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