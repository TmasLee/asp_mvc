import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import axios from 'axios';

import { GenericModal } from '../generics';
import { RequestLink } from './RequestLink';
import authService from '../../AuthenticationService';

export class RequestsModal extends Component {
    state = {
        requests: {
            received: [],
            sent: []
        }
    }

    async componentDidMount(){
        this.props.setUser(await authService.retrieveUser());
        await axios.get(
            '/friendship/get-requests', {
            params: {
                currentUserId: this.props.currentUser.id
            }
        })
        .then((resp) => {
            this.setState({ requests: resp.data })
        })
        .catch((err) => console.error(err));

        if (this.props.connection){
            this.props.connection.on("ReceiveRequestsList", (requests) => {
                this.setState({ requests: requests });
            });
        }
    }

    acceptRequest = async (userId, friendId) => {
        await axios.put(
            '/friendship/accept-request',
            {
                userId: userId,
                friendId: friendId
            }
        )
        .then(async (resp) => {
            this.setState({ requests: resp.data });
        })
        .catch((err) => console.error(err));
    }

    declineRequest = async (userId, friendId) => {
        await axios.post(
            '/friendship/decline-request',
            {
                userId: userId,
                friendId: friendId
            }
        )
        .then(async (resp) => {
            this.setState({ requests: resp.data });
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
                        requests.received.map((request, i) => {
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
                        requests.sent.map((request, i) => {
                            return <RequestLink key ={i} request={request}/>
                        })
                    }
                </ListGroup>
            </GenericModal>
        );
    }
}
