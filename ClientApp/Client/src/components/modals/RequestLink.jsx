import React, { Component } from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';
import axios from 'axios';

export class RequestLink extends Component {
    acceptRequest = () => {
        const { userId, friendId } = this.props.request;
        axios.post(
            '/user/accept-request',
            {
                'userId': userId,
                'friendId': friendId
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
        const { userId, friendId, email, firstName, lastName } = this.props.request;

        let addBtn = (userId !== friendId) ? <Button onClick={this.acceptRequest}>Add</Button> : null;

        return (
            <ListGroupItem>
                {email}
                {addBtn}
            </ListGroupItem>
        )
    }
}