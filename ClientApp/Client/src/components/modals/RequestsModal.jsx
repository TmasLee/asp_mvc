import React, { Component } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';

import { GenericModal } from '../generics';
import UserListItem from './UserListItem';

export class RequestsModal extends Component {
    state = {
        requests: {
            received: [],
            sent: []
        }
    }

    async componentDidMount(){
        await axios.get(
            '/friendship/get-requests-list', {
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
        .then((resp) => {
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
        .then((resp) => {
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
                            let acceptBtn = (
                                <Button
                                    className="float-right"
                                    onClick={(e)=> this.acceptRequest(request.userId, request.friendId)}
                                >
                                    Accept
                                </Button>
                            );
                            let declineBtn = (
                                <Button
                                    className="float-right"
                                    onClick={(e)=> this.declineRequest(request.userId, request.friendId)}
                                >
                                    Decline
                                </Button>
                            );
                            return (
                                <UserListItem
                                    key={i}
                                    userEmail={request.email}
                                    userId={request.userId}
                                >
                                    {declineBtn}
                                    {acceptBtn}
                                </UserListItem>
                            )
                        })
                    }
                </ListGroup>
                <br/>
                <h6>Pending Sent Requests</h6>
                <ListGroup>
                    {
                        requests.sent.map((request, i) => {
                            return (
                                <UserListItem
                                    key ={i}
                                    userEmail={request.email}
                                    userId={request.friendId}/>
                            )
                        })
                    }
                </ListGroup>
            </GenericModal>
        );
    }
}
