import React, { Component } from 'react';
import axios from 'axios';

import { ListModalWithSearch } from '../generics';
import authService from '../../AuthenticationService';

export class FriendListModal extends Component {
    async componentDidMount(){
        this.props.setUser(await authService.retrieveUser());
    }

    deleteFriend = (friendId) => {
        axios.post(
            '/user/remove-friend',
            {
                'userId': this.props.currentUser.id,
                'friendId': friendId
            },
        )
        .then(async (resp) => {
            this.props.setUser(await authService.retrieveUser());
        })
        .catch((err) => console.error(err));
    }

    render(){
        const FriendsModal = ListModalWithSearch(this.props.currentUser.friends);
        return (<FriendsModal userAction={this.deleteFriend} {...this.props}/>);
    }
}
