import React, { Component } from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';

export class RequestLink extends Component {
    render(){
        const { userId, friendId, email, firstName, lastName } = this.props.request;

        let addBtn = (userId !== friendId) ? <Button onClick={(e)=>this.props.accept(userId, friendId)}>Accept</Button> : null;

        return (
            <ListGroupItem>
                {email}
                {addBtn}
            </ListGroupItem>
        )
    }
}