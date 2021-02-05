import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

import { GenericModal } from '../generics';
import authService from '../../AuthenticationService';

export class FriendListModal extends Component {
    state = {
        users: [],
        queriedUsers: [],
        searchField: ''
    }

    componentDidMount(){
        const { currentUser } = this.props;
        this.setState({
            users: currentUser.friends,
            queriedUsers: currentUser.friends
        });
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
                users: resp.data,
                queriedUsers: resp.data
            });
            this.props.setUser(await authService.retrieveUser());
        })
        .catch((err) => console.error(err));
    }

    generateFriendList = () => {
        let friendList = this.state.queriedUsers.map((user, i) => {
            return (
                <ListGroupItem key={i}>
                    <a href={`/user/${user.id}`} style={{textDecoration: 'none'}}>
                        {user.email}
                    </a>
                    <Button variant='danger' onClick={(e)=>this.deleteFriend(user.id)}>Delete</Button>
                </ListGroupItem>
            )
        });

        return friendList;
    }

    render(){
        let friendList = this.generateFriendList();

        return(
            <GenericModal title='Friends'
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
                        friendList.map((user) => {
                            return user;
                        })
                    }
                </ListGroup>
            </GenericModal>
        );
    }
}
