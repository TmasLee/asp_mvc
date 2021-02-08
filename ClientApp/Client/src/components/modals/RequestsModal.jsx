import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import axios from 'axios';

import { GenericModal } from '../generics';
import { RequestLink } from './RequestLink';
import authService from '../../AuthenticationService';

export class RequestsModal extends Component {
    state = {
        requests: {
            pendingRequests: [],
            pendingSentRequests: []
        }
    }

    async componentDidMount(){
        this.props.setUser(await authService.retrieveUser());
        await axios.get(
            '/user/get-requests', {
            params: {
                currentUserId: this.props.currentUser.id
            }
        })
        .then((resp) => {
            this.setState({ requests: resp.data })
        })
        .catch((err) => console.error(err));
    }

    acceptRequest = async (userId, friendId) => {
        await axios.put(
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
        .catch((err) => console.error(err));
    }

    declineRequest = async (userId, friendId) => {
        await axios.post(
            '/user/decline-request',
            {
                userId: userId,
                friendId: friendId
            }
        )
        .then(async (resp) => {
            this.setState({ requests: resp.data });
            this.props.setUser(await authService.retrieveUser());
        })
        .catch((err) => console.error(err));
    }

    render(){
        const { requests } = this.state;
        return (
            <GenericModal {...this.props}>
                <h6>Pending Requests</h6>
                <ListGroup>
                    {
                        requests.pendingRequests.map((request, i) => {
                            return <RequestLink
                                        key={i}
                                        accept={this.acceptRequest}
                                        decline={this.declineRequest}
                                        request={request}
                                    />
                        })
                    }
                </ListGroup>
                <br/>
                <h6>Pending Sent Requests</h6>
                <ListGroup>
                    {
                        requests.pendingSentRequests.map((request, i) => {
                            return <RequestLink key ={i} request={request}/>
                        })
                    }
                </ListGroup>
            </GenericModal>
        );
    }
}
