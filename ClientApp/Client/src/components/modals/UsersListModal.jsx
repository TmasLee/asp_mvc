import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

import { GenericModal } from '../generics';

export class UsersListModal extends Component {
    state = {
        users: [],
        queriedUsers: [],
        searchField: ''
    }

    componentDidMount(){
        axios.get('/user/get-users')
        .then((resp) => {
            this.setState({
                users: resp.data,
                queriedUsers: resp.data
            });
        })
        .catch((err)=>console.error(err));
    }

    // Add debounce user input?
    handleInputOnChange = (e) => this.setState({ [e.target.name]: e.target.value });

    // Shitty search lol
    searchUsers = () => {
        if (this.state.searchField === ''){
            let queriedUsers = this.state.users;
            this.setState({ queriedUsers: queriedUsers });
        } else {
            let queriedUsers = [];
            this.state.users.forEach((user) => {
                if (user.email.includes(this.state.searchField)){
                    queriedUsers.push(user);
                }
            });
            this.setState({ queriedUsers: queriedUsers });
        }
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
        let friendEmails = this.getFriendEmails();
        let userList = this.state.queriedUsers.map((user, i) => {
            let actionBtn = <Button onClick={(e)=>this.addFriend(user.id)}>Add</Button>;
            if (this.props.currentUser.id === user.id || friendEmails.includes(user.email)){
                actionBtn = null;
            }

            return (
                <ListGroupItem key={i}>
                    <a href={`/user/${user.id}`} style={{textDecoration: 'none'}}>
                        {user.email}
                    </a>
                    {actionBtn}
                </ListGroupItem>
            )
        });

        return userList;
    }

    getFriendEmails = () => {
        let friendEmails = [];
        this.props.currentUser.friends.forEach((friend) => friendEmails.push(friend.email));
        return friendEmails;
    }

    render(){
        let userList = this.generateUserList();

        return(
            <GenericModal title='All Users'
                          toggalModal={this.props.toggleModal}
                          {...this.props}>
                <InputGroup>
                    <FormControl placeholder='Search an email'
                                 name='searchField'
                                 onChange={this.handleInputOnChange}
                                 />
                    <InputGroup.Append>
                        <Button onClick={this.searchUsers}>Search</Button>
                    </InputGroup.Append>
                </InputGroup>
                <br/>
                <ListGroup>
                    {
                        userList.map((user) => {
                            return user;
                        })
                    }
                </ListGroup>
            </GenericModal>
        );
    }
}
