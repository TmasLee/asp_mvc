import React, { Component } from 'react';

import { LoginModal } from './LoginModal';
import { UsersListModal } from './UsersListModal';
import { RequestsModal } from './RequestsModal';
import { FriendListModal } from './FriendListModal';

export class ModalSwitch extends Component {
    render(){
        switch (this.props.modalType) {
            case 'login':
                return (<LoginModal {...this.props}/>)
            case 'users':
                return (<UsersListModal {...this.props}/>);
            case 'friends':
                return (<FriendListModal {...this.props}/>);
            case 'requests':
                return (<RequestsModal {...this.props}/>)
            default:
                return null
        }
    }
}