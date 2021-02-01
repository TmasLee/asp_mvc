import React, { Component } from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';

export const UserLink = ({ user }) => {
    return(
        <ListGroupItem action
                       href={`/user/${user.id}`}>
            {user.email}
            {' '}
            <Button>Add</Button>
        </ListGroupItem>
    )
}