import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import axios from 'axios';

import { GenericModal } from '../generics';
import { RequestLink } from './RequestLink';
import authService from '../../AuthenticationService';

export class RequestsModal extends Component {
    state = {
        requests: []
    }

    componentDidMount(){
        axios.get(
            '/user/get-requests', {
            params: {
                currentUserId: this.props.currentUser.id
            }
        })
        .then((resp) => {
            this.setState({ requests: resp.data})
        })
        .catch((err) => console.error(err));
    }

    acceptRequest = (userId, friendId) => {
        axios.put(
            '/user/accept-request',
            {
                userId: userId,
                friendId: friendId
            }
        )
        .then(async (resp) => {
            this.setState({ requests: resp.data });
            this.props.setUser(await authService.retrieveUser());
        })
        .catch((err) => console.error(err.data));
    }

    declineRequest = (userId, friendId) => {
        axios.post(
            '/user/decline-request',
            {
                userId: userId,
                friendId: friendId
            }
        )
        .then((resp) => {
            this.setState({ requests: resp.data });
        })
        .catch((err) => console.error(err));
    }

    render(){
        return(
            <GenericModal title="Requests"
                          toggalModal={this.props.toggleModal}
                          {...this.props}>
                <ListGroup>
                    {
                        this.state.requests.map((request, i) => {
                            return <RequestLink key={i}
                                                accept={this.acceptRequest}
                                                decline={this.declineRequest}
                                                request={request}/>
                        })
                    }
                </ListGroup>
            </GenericModal>
        );
    }
}
