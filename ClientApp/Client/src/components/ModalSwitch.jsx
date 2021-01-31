import React, { Component } from 'react';

import { LoginModal } from './LoginModal';
import { UsersList } from './UsersList';

export class ModalSwitch extends Component {
    render(){
        switch (this.props.modalType) {
            case 'login':
                return (<LoginModal {...this.props}/>)
            case 'usersList':
                return (<UsersList {...this.props}/>);
            default:
                return null
        }
    }
}