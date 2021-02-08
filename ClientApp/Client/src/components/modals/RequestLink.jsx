import React from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';

export function RequestLink({ request, accept = null, decline = null }){
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