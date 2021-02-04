import React, { Component } from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';
import axios from 'axios';

import { getCsrfToken } from '../../utilities/utils';

export class UserLink extends Component {
    addFriend = () => {
        let config = {
            headers: {
                'csrf-token': getCsrfToken()
            }
        }
        axios.post(
            '/user/add-friend',
            {
                'userId': this.props.currentUser.id,
                'friendId': this.props.user.id
            },
            config
        )
        .then((resp) => {
            console.log(resp);
        })
        .catch((err) => {
            console.error(err.data);
        })
    }

    render(){
        const { currentUser, user } = this.props;

        let addBtn = null;

        if (currentUser !== null){
            if (currentUser.id === user.id ){
                addBtn = null;
            } else {
                addBtn = <Button onClick={this.addFriend}>Add</Button>;
            }
        }

        return (
            <ListGroupItem>
                <a href={`/user/${user.id}`} style={{textDecoration: 'none'}}>
                    {user.email}
                </a>
                {addBtn}
            </ListGroupItem>
        )
    }
}