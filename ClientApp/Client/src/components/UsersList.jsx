import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

import { GenericModal } from './generics';

export class UsersList extends Component {
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
        });
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
                        this.state.queriedUsers.map((user) => <UserLink key={user.id} user={user}/>)
                    }
                </ListGroup>
            </GenericModal>
        );
    }
}

class UserLink extends Component {
    render(){
        return(
            <ListGroupItem action
                           href={`/user/${this.props.user.id}`}>
                {this.props.user.email}
                {' '}
                <Button>Add</Button>
            </ListGroupItem>
        )
    }
}