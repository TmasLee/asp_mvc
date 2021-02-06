import React, { Component } from 'react';
import axios from 'axios';

import { ListModalWithSearch } from '../generics';
import authService from '../../AuthenticationService';

export class FriendListModal extends Component {
    state = {
        users: []
    }

    componentDidMount(){
        const { currentUser } = this.props;
        this.setState({
            users: currentUser.friends
        });
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
            this.setState({
                users: resp.data
            });
            this.props.setUser(await authService.retrieveUser());
        })
        .catch((err) => console.error(err));
    }

    render(){
        const FriendsModal = ListModalWithSearch(this.state.users);
        return (<FriendsModal userAction={this.deleteFriend} {...this.props}/>);
    }
}
