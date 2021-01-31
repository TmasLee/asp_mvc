import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { LoadingButton } from './LoadingButton';

export class GenericModal extends Component {
    render(){
        const { showModal, title, toggleModal, primaryButtonMsg = null, action = null, loading = false } = this.props;
        let primaryButton = action ? <Button variant="primary" onClick={action}>{primaryButtonMsg}</Button> : null
        return (
            <Modal show={showModal} onHide={toggleModal} backdrop={loading ? 'static' : true}>
                <Modal.Header>{title}</Modal.Header>
                <Modal.Body style={{'maxHeight': 'calc(100vh - 210px)', 'overflowY': 'auto'}}>
                    {this.props.children}
                </Modal.Body>
                <Modal.Footer>
                    {
                        loading ? <LoadingButton/>
                        :
                        <div>
                            {primaryButton}
                            {' '}
                            <Button variant="secondary" onClick={toggleModal}>Cancel</Button>
                        </div>
                    }
                </Modal.Footer>
            </Modal>
        )
    }
}
