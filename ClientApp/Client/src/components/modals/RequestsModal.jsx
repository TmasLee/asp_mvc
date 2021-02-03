import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import axios from 'axios';

import { GenericModal } from '../generics';
import { RequestLink } from './RequestLink';
import { getCsrfToken } from '../../utilities/utils';

let config = {
    headers: {
        'csrf-token': getCsrfToken()
    }
}


// After accepting request, do get-requests again to update modal
export class RequestsModal extends Component {
    state = {
        requests: []
    }

    componentDidMount(){
        config.params = {
            currentUserId: this.props.currentUser.id
        }
        axios.get(
            '/user/get-requests',
            config
            )
        .then((resp) => {
            console.log(resp);
            this.setState({ requests: resp.data})
        })
        .catch((err) => {
            console.error(err);
        });
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
                            return <RequestLink key={i} request={request}/>
                        })
                    }
                </ListGroup>
            </GenericModal>
        );
    }
}
