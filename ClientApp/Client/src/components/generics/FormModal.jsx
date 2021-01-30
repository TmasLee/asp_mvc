import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { LoadingButton } from '../generics/LoadingButton';

export class FormModal extends Component {
    render(){
        const { showModal, title, primaryButtonMsg, resetAndToggleModal, action, loading } = this.props;
        return (
            <Modal show={showModal} onHide={resetAndToggleModal} backdrop={loading ? 'static' : true}>
                <Modal.Header>{title}</Modal.Header>
                <Modal.Body>
                    {this.props.children}
                </Modal.Body>
                <Modal.Footer>
                    {
                        loading ? <LoadingButton/>
                        :
                        <div>
                            <Button variant="primary" onClick={action}>{primaryButtonMsg}</Button>
                            {' '}
                            <Button variant="secondary" onClick={resetAndToggleModal}>Cancel</Button>
                        </div>
                    }
                </Modal.Footer>
            </Modal>
        )
    }
}
