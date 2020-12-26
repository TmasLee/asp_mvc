import React from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import { LoadingButton } from '../generics/LoadingButton';

export const FormModal = (props) => {
    const { showModal, title, primaryButtonMsg, resetAndToggleModal, action, serverResponse, serverError, loading } = props;
    return (
        <Modal show={showModal} onHide={resetAndToggleModal}>
            <Modal.Header>{title}</Modal.Header>
            <Modal.Body>
                {
                    serverError ? <Alert variant="danger">{serverError}</Alert>
                    : serverResponse ? <Alert variant="success">{serverResponse}</Alert>
                    : null
                }
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                {
                    loading ? <LoadingButton/>
                    :
                    <Button variant="primary" onClick={action}>{primaryButtonMsg}</Button>
                }
                {' '}
                <Button variant="secondary" onClick={resetAndToggleModal}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}
