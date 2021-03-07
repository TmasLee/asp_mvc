import React from 'react';

import {
    LoginModal,
    FriendListModal,
    UsersListModal,
    RequestsModal
} from './';

export default function ModalSwitch(props){
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