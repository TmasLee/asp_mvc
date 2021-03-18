import React, { Component } from 'react';
import axios from 'axios';

import { ListModalWithSearch, UserListItem, UserListItemWithMessageField } from '../generics';

export default class UsersListModal extends Component {
    state = {
        users: [],
        friends: [],
        response: '',
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

    addFriend = async (userId, message) => {
        await axios.post(
            '/friendship/add-friend',
            {
                'userId': this.props.currentUser.id,
                'friendId': userId,
                'text': message
            },
        )
        .then((resp) => {
            this.setState({
                response: 'Sent!',
                error: ''
            })
        })
        .catch((err) => this.setState({ error: err.response.data }));
    }

    filterFriendsAndSelf = () => {
        const { users, friends } = this.state;
        let friendsAndSelfEmails = [this.props.currentUser.email];
        friends.forEach((friend) => friendsAndSelfEmails.push(friend.email));

        let userList = users.reduce((result, user, i) => {
            if (!friendsAndSelfEmails.includes(user.email)){
                let UserItem = UserListItemWithMessageField(this.addFriend)
                result.push(
                    <UserItem
                        key={i}
                        userEmail={user.email}
                        userId={user.id}
                    />
                );
            }
            return result;
        }, []);

        return userList;
    }

    render(){
        let userList = this.state.users;

        if (this.props.currentUser){
            userList = this.filterFriendsAndSelf();
        } else {
            userList = userList.map((user, i) => {
                return (
                    <UserListItem
                        key={i}
                        userEmail={user.email}
                        userId={user.id}
                    />
                )
            })
        }

        let UsersModal = ListModalWithSearch(userList);
        return (
            <UsersModal
                response={this.state.response}
                error={this.state.error}
                {...this.props}
            />
        );
    }
}
