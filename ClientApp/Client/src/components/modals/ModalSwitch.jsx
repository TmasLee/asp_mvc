import React, { Component } from 'react';

import LoginModal from './LoginModal';
import { UsersListModal } from './UsersListModal';
import { RequestsModal } from './RequestsModal';
import { FriendListModal } from './FriendListModal';

export class ModalSwitch extends Component {
    render(){
        switch (this.props.modalType) {
            case 'login':
                return (<LoginModal {...this.props}/>)
            case 'users':
                return (<UsersListModal title='All Users' {...this.props}/>);
            case 'friends':
                return (<FriendListModal title='Friends' {...this.props}/>);
            case 'requests':
                return (<RequestsModal title='Requests' {...this.props}/>)
            default:
                return null
        }
    }
}