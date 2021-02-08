import React from 'react';
import { Modal } from 'react-bootstrap';

export function GenericModal(props){
    const { showModal, title, toggleModal, loading = false } = props;
    return (
        <Modal show={showModal} onHide={toggleModal} backdrop={loading ? 'static' : true}>
            <Modal.Header>{title}</Modal.Header>
            <Modal.Body style={{'maxHeight': 'calc(100vh - 210px)', 'overflowY': 'auto'}}>
                {props.children}
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    )
}
