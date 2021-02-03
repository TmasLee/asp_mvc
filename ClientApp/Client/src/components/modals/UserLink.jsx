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