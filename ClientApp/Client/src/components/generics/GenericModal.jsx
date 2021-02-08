import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { LoadingButton } from './';

/**
 * Needs cleaning
 */
export function GenericModal(props){
    const { showModal, title, toggleModal, primaryButtonMsg = null, action = null, loading = false } = props;
    let primaryButton = null;
    let footerButtons = <LoadingButton />

    if (action){
        primaryButton = (
            <Button variant="primary" onClick={action}>
                {primaryButtonMsg}
            </Button>
        );
    }

    if (!loading){
        footerButtons = (
            <div>
                {primaryButton}
                {' '}
                <Button variant="secondary" onClick={toggleModal}>Cancel</Button>
            </div>
        );
    }

    return (
        <Modal show={showModal} onHide={toggleModal} backdrop={loading ? 'static' : true}>
            <Modal.Header>{title}</Modal.Header>
            <Modal.Body style={{'maxHeight': 'calc(100vh - 210px)', 'overflowY': 'auto'}}>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                {footerButtons}
            </Modal.Footer>
        </Modal>
    )
}
