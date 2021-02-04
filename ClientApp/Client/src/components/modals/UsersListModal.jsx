import React, { Component } from 'react';
import { ListGroup, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

import { GenericModal } from '../generics';
import { UserLink } from './UserLink';
import { getCsrfToken } from '../../utilities/utils';

export class UsersListModal extends Component {
    state = {
        users: [],
        queriedUsers: [],
        searchField: ''
    }

    componentDidMount(){
        if (this.props.type === 'friends'){
            let config = {
                headers: {
                    'csrf-token': getCsrfToken()
                },
                params: {
                    currentUserId: this.props.currentUser.id
                }
            }
            axios.get(
                '/user/get-friends',
                config
            )
            .then((resp) => {
                console.log(resp);
                this.setState({
                    users: resp.data,
                    queriedUsers: resp.data
                })
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
                        this.state.queriedUsers.map((user, i) => {
                            return <UserLink key={i} currentUser={this.props.currentUser} user={user}/>
                        })
                    }
                </ListGroup>
            </GenericModal>
        );
    }
}
