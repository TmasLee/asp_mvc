import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import axios from 'axios';

import { GenericModal } from '../generics';
import { RequestLink } from './RequestLink';
import { getCsrfToken } from '../../utilities/utils';

// After accepting request, do get-requests again to update modal
export class RequestsModal extends Component {
    state = {
        requests: []
    }

    componentDidMount(){
        this.config = {
            headers: {
                'csrf-token': getCsrfToken()
            },
            params: {
                currentUserId: this.props.currentUser.id
            }
        }

        axios.get(
            '/user/get-requests',
            this.config
            )
        .then((resp) => {
            console.log(resp);
            this.setState({ requests: resp.data})
        })
        .catch((err) => {
            console.error(err);
        });
    }

    acceptRequest = (userId, friendId) => {
        axios.put(
            '/user/accept-request',
            {
                userId: userId,
                friendId: friendId
            },
            this.config
        )
        .then((resp) => {
            console.log(resp);
            this.setState({ requests: resp.data });
        })
        .catch((err) => {
            console.error(err.data);
        })
    }

    render(){
        return(
            <GenericModal title="Requests"
                          toggalModal={this.props.toggleModal}
                          {...this.props}>
                <ListGroup>
                    {
                        this.state.requests.map((request, i) => {
                            console.log(request)
                            return <RequestLink key={i} accept={this.acceptRequest} request={request}/>
                        })
                    }
                </ListGroup>
            </GenericModal>
        );
    }
}
