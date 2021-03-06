import React, { Component } from 'react';
import axios from 'axios';

import { ListModalWithSearch } from '../generics';

export class FriendListModal extends Component {
    state = {
        friends: []
    }

    async componentDidMount(){
        await axios.get(
            '/friendship/get-friends-list', {
            params: {
                currentUserId: this.props.currentUser.id
            }
        })
        .then((resp) => {
            this.setState({ friends: resp.data })
        })
        .catch((err) => console.error(err));

        if (this.props.connection){
            this.props.connection.on("ReceiveFriendsList", (friends) => {
                this.setState({ friends: friends});
            });
        }
    }

    deleteFriend = async (friendId) => {
        await axios.post(
            '/friendship/remove-friend',
            {
                'userId': this.props.currentUser.id,
                'friendId': friendId
            },
        )
        .then((resp) => {
            this.setState({ friends: resp.data });
        })
        .catch((err) => console.error(err));
    }

    render(){
        let userBtns = [
            {
                action: this.deleteFriend,
                name: 'Delete',
                variant: 'danger'
            }
        ];
        const FriendsModal = ListModalWithSearch(this.state.friends);
        return (
            <FriendsModal
                userBtns={userBtns}
                {...this.props}
            />
        );
    }
}
