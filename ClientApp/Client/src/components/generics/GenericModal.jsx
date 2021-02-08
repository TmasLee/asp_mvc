import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { LoadingButton } from './';

/**
 * Needs cleaning + heavy refactoring
 * There should only be action - I shouldn't need modalAction and searchFunc
 * Also button construction is gross + ternary needs to go
 */
export function GenericModal(props){
    const { showModal, title, toggleModal, primaryButtonMsg = null,
            action = null, loading = false, searchFunc = null } = props;
    let primaryButton = null;
    let footerButtons = <LoadingButton />;
    let modalAction;

    if (action){
        primaryButton = (
            <Button variant="primary" type="submit">
                {primaryButtonMsg}
            </Button>
        );
        modalAction = action;
    } else if (searchFunc){
        modalAction = searchFunc;
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
            <Form onSubmit={(e)=>{e.preventDefault(); modalAction()}}>
                <Modal.Body style={{'maxHeight': 'calc(100vh - 210px)', 'overflowY': 'auto'}}>
                    {props.children}
                </Modal.Body>
                <Modal.Footer>
                    {footerButtons}
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
