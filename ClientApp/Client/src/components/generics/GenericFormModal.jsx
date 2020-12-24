import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export const GenericFormModal = (props) => {
    const { showModal, title, message, primaryButtonMsg, resetAndToggleModal, action } = props;

    return (
        <Modal show={showModal} onHide={resetAndToggleModal}>
            <Modal.Header>{title}</Modal.Header>
            <Modal.Body>
                <p>{message}</p>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={action}>{primaryButtonMsg}</Button>{' '}
                <Button variant="secondary" onClick={resetAndToggleModal}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}
