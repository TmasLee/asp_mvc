import React, { Component } from 'react';
import axios from 'axios';

import { ListModalWithSearch } from '../generics';

export class UsersListModal extends Component {
    state = {
        users: []
    }

    componentDidMount(){
        axios.get('/user/get-users')
        .then((resp) => {
            this.setState({
                users: resp.data
            });
        })
        .catch((err)=>console.error(err));
    }

    addFriend = (friendId) => {
        axios.post(
            '/user/add-friend',
            {
                'userId': this.props.currentUser.id,
                'friendId': friendId
            },
        )
        .catch((err) => console.error(err));
    }

    generateUserList = () => {
        const { currentUser } = this.props;
        let friendEmails = this.getFriendEmails();
        let userList = this.state.users;

        if (!currentUser){
            return userList;
        }

        userList = this.state.users.filter((user) => currentUser.id !== user.id || !friendEmails.includes(user.email));

        return userList;
    }

    getFriendEmails = () => {
        const { currentUser } = this.props;
        let friendEmails = [];

        if (currentUser){
            currentUser.friends.forEach((friend) => friendEmails.push(friend.email));
        }

        return friendEmails;
    }

    render(){
        let userList = this.generateUserList();
        let UsersModal = ListModalWithSearch(userList);

        return (<UsersModal userAction={this.addFriend} {...this.props}/>);
    }
}
