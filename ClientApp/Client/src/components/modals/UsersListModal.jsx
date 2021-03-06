import React, { Component } from 'react';
import axios from 'axios';

import { ListModalWithSearch } from '../generics';

export class UsersListModal extends Component {
    state = {
        users: [],
        friends: [],
        error: ''
    }

    async componentDidMount(){
        let users = [];
        let friends = [];
        await axios.get('/user/get-users')
        .then((resp) => {
            users = resp.data;
        })
        .catch((err)=>console.error(err));

        if (this.props.currentUser){
            await axios.get(
                '/friendship/get-friends-list', {
                params: {
                    currentUserId: this.props.currentUser.id
                }
            })
            .then((resp) => {
                friends = resp.data;
            })
            .catch((err) => console.error(err));
        }

        this.setState({
            users: users,
            friends: friends
        });
    }

    resetError = () => this.setState({ error: '' })

    addFriend = async (userId) => {
        await axios.post(
            '/friendship/add-friend',
            {
                'userId': this.props.currentUser.id,
                'friendId': userId
            },
        )
        .then((resp) => this.resetError())
        .catch((err) => this.setState({ error: err.response.data }));
    }

    filterFriendsAndSelf = () => {
        let friendsAndSelfEmails = [this.props.currentUser.email];
        this.state.friends.forEach((friend) => friendsAndSelfEmails.push(friend.email));
        return this.state.users.filter((user) => !friendsAndSelfEmails.includes(user.email));
    }

    render(){
        let userList = this.state.users;
        let userBtns = [];

        if (!this.state.users.length){
            return null;
        }

        if (this.props.currentUser){
            userList = this.filterFriendsAndSelf();
            userBtns = [
                {
                    action: this.addFriend,
                    name: 'Add'
                }
            ];
        }

        let UsersModal = ListModalWithSearch(userList);
        return (
            <UsersModal
                userBtns={userBtns}
                error={this.state.error}
                {...this.props}
            />
        );
    }
}
