import React, { Component } from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';

export class RequestLink extends Component {
    render(){
        const { request, accept = null, decline = null } = this.props;

        let acceptBtn = null;
        let declineBtn = null;

        if (accept && decline){
            acceptBtn = <Button onClick={(e)=>accept(request.userId, request.friendId)}>Accept</Button>
            declineBtn = <Button onClick={(e)=>decline(request.userId, request.friendId)}>Decline</Button>
        }

        return (
            <ListGroupItem>
                {request.email}
                {acceptBtn}
                {declineBtn}
            </ListGroupItem>
        )
    }
}