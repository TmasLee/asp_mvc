import React, { Component } from 'react';
import axios from 'axios';

import { ListModalWithSearch } from '../generics';

export class UsersListModal extends Component {
    state = {
        users: []
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

    addFriend = (userId) => {
        axios.post(
            '/user/add-friend',
            {
                'userId': this.props.currentUser.id,
                'friendId': userId
            },
        )
        .catch((err) => console.error(err));
    }

    filterFriendsAndSelf = () => {
        const { currentUser } = this.props;
        let friendsAndSelfEmails = [currentUser.email];
        currentUser.friends.forEach((friend) => friendsAndSelfEmails.push(friend.email));
        return this.state.users.filter((user) => !friendsAndSelfEmails.includes(user.email));
    }

    render(){
        let userList = this.state.users;

        if (this.props.currentUser){
            userList = this.filterFriendsAndSelf();
        }

        let UsersModal = ListModalWithSearch(userList);
        return (<UsersModal userAction={this.addFriend} {...this.props}/>);
    }
}
