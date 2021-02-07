import React, { Component } from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';

export class RequestLink extends Component {
    render(){
        const { accept = null, decline = null } = this.props;
        const { userId, friendId, email } = this.props.request;

        let acceptBtn = (accept) ? <Button onClick={(e)=>accept(userId, friendId)}>Accept</Button> : null;
        let declineBtn = (decline) ? <Button onClick={(e)=>decline(userId, friendId)}>Decline</Button> : null;
        return (
            <ListGroupItem>
                {email}
                {acceptBtn}
                {declineBtn}
            </ListGroupItem>
        )
    }
}