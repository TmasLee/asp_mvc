import React, { Component } from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';
import axios from 'axios';

export class UserLink extends Component {
    addFriend = () => {
        console.log(this.props.currentUser);
        axios.post(
            '/user/add-friend',
            {
                'userId': this.props.currentUser.id,
                'friendId': this.props.user.id
            }
        )
        .then((resp) => {
            console.log(resp);
        })
        .catch((err) => {
            console.error(err.data);
        })
    }

    render(){
        const { id, email } = this.props.user;
        return (
            <ListGroupItem>
                <a href={`/user/${id}`} style={{textDecoration: 'none'}}>{email}</a>
                {' '}
                <Button onClick={this.addFriend}>Add</Button>
            </ListGroupItem>
        )
    }
}