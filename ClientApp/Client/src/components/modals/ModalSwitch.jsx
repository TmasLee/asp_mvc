import React from 'react';

import LoginModal from './LoginModal';
import { UsersListModal } from './UsersListModal';
import { RequestsModal } from './RequestsModal';
import { FriendListModal } from './FriendListModal';

export function ModalSwitch(props){
    switch (props.modalType) {
        case 'login':
            return (<LoginModal {...props}/>)
        case 'users':
            return (<UsersListModal title='All Users' {...props}/>);
        case 'friends':
            return (<FriendListModal title='Friends' {...props}/>);
        case 'requests':
            return (<RequestsModal title='Requests' {...props}/>)
        default:
            return null
    }
}