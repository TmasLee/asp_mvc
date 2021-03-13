import React, { Component } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import sad_cat from '../../../../assets/sad_cat.jpg';

import { GenericModal, UserListItem } from '../generics';

export default class RequestsModal extends Component {
    state = {
        requests: {
            received: [],
            sent: []
        },
        friends: []
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

        await axios.get(
            '/friendship/get-friends-list', {
            params: {
                currentUserId: this.props.currentUser.id
            }
        })
        .then((resp) => {
            this.setState({ friends: resp.data })
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

    makeFriends = () => {
        axios.get('/friendship/give-friends', {
            params: {
                currentUserId: this.props.currentUser.id
            }
        })
        .catch((err) => console.error(err));
    }

    render(){
        const { requests, friends } = this.state;
        return (
            <GenericModal {...this.props}>
                <h5>Pending Requests</h5>
                {
                    requests.received.length ? (
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
                                            {
                                                request ? `  says: ${request.text}`
                                                : null
                                            }
                                        </UserListItem>
                                    )
                                })
                            }
                        </ListGroup>
                    ) : (
                        <div>
                            Nobody added you :(
                            <img src={sad_cat} alt="Sad Cat :(" width={75}/>
                        </div>
                    )
                }
                <br/>
                <h5>Pending Sent Requests</h5>
                {
                    requests.sent.length ? (
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
                    ) : <div>Go add some people!</div>
                }
                <br/><br/>
                {
                    (!requests.sent.length && !requests.received.length && !friends.length) ?
                    (
                        <Button onClick={(e)=>this.makeFriends()}>
                            Make Friends!
                        </Button>
                    ) : null
                }
            </GenericModal>
        );
    }
}
