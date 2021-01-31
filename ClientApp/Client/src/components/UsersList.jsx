import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import axios from 'axios';

import { GenericModal } from './generics';

export class UsersList extends Component {
    state = {
        users: []
    }

    componentDidMount(){
        axios.get('/user/get-users')
        .then((resp) => {
            this.setState({ users: resp.data })
        })
    }

    render(){
        return(
            <GenericModal title='All Users'
                          toggalModal={this.props.toggleModal}
                          {...this.props}>
                <ListGroup>
                    {
                        this.state.users.map((user) => <UserLink key={user.id} user={user}/>)
                    }
                </ListGroup>
            </GenericModal>
        );
    }
}

class UserLink extends Component {
    render(){
        return(
            <ListGroupItem action
                           href={`/user/${this.props.user.id}`}>
                {this.props.user.firstName}
                {' '}
                <Button>Add</Button>
            </ListGroupItem>
        )
    }
}