import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

export default function UserListItem(props){
    const { userEmail, userId } = props;
    return (
        <ListGroupItem>
            <a href={`/user/${userId}`} style={{textDecoration: 'none'}}>
                {userEmail}
            </a>
            {props.children}
        </ListGroupItem>
    )
}