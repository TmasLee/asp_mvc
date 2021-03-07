import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

import { ListModalWithSearch, UserListItem } from '../generics';

export default class FriendListModal extends Component {
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
        let friendList = this.state.friends.map((user, i) => {
            let removeBtn = (
                <Button
                    className="float-right"
                    variant='danger'
                    onClick={() => this.deleteFriend(user.id)}
                >
                    Delete
                </Button>
            )
            return (
                <UserListItem
                    key={i}
                    userEmail={user.email}
                    userId={user.id}
                >
                    {removeBtn}
                </UserListItem>
            )
        })

        const FriendsModal = ListModalWithSearch(friendList);
        return (
            <FriendsModal {...this.props}/>
        );
    }
}
