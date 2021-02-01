import React, { Component } from 'react';
import { ListGroup, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

import { GenericModal } from '../generics';
import { UserLink } from '../generics';

export class UsersListModal extends Component {
    state = {
        users: [],
        queriedUsers: [],
        searchField: ''
    }

    componentDidMount(){
        if (this.props.type === 'friends'){
            axios.get('/user/get-friends')
            .then((resp) => {
                console.log(resp);
            });
        } else {
            axios.get('/user/get-users')
            .then((resp) => {
                this.setState({
                    users: resp.data,
                    queriedUsers: resp.data
                });
            });
        }
    }

    // Add debounce user input?
    handleInputOnChange = (e) => this.setState({ [e.target.name]: e.target.value });

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

    render(){
        let title = (this.props.type === 'friends') ? 'Friends' : 'All Users';
        return(
            <GenericModal title={title}
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
                        this.state.queriedUsers.map((user) => {
                            return <UserLink key={user.id} currentUser={this.props.currentUser} user={user}/>
                        })
                    }
                </ListGroup>
            </GenericModal>
        );
    }
}