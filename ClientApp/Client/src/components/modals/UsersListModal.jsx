import React, { Component } from 'react';
import axios from 'axios';

import { ListModalWithSearch } from '../generics';

export class UsersListModal extends Component {
    state = {
        users: [],
        error: ''
    }

    async componentDidMount(){
        await axios.get('/user/get-users')
        .then((resp) => {
            this.setState({
                users: resp.data
            });
        })
        .catch((err)=>console.error(err));
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
        const { currentUser } = this.props;
        let friendsAndSelfEmails = [currentUser.email];
        currentUser.friends.forEach((friend) => friendsAndSelfEmails.push(friend.email));
        return this.state.users.filter((user) => !friendsAndSelfEmails.includes(user.email));
    }

    render(){
        let userList = this.state.users;

        if (!this.state.users.length){
            return null;
        }

        if (this.props.currentUser){
            userList = this.filterFriendsAndSelf();
        }

        let UsersModal = ListModalWithSearch(userList);
        return (
            <UsersModal 
                userAction={this.addFriend}
                error={this.state.error}
                {...this.props}
            />
        );
    }
}
