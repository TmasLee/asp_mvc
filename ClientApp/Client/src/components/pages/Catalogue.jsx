import React, { Component } from 'react';
import { Row, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';

export class Catalogue extends Component {
    state = {}

    async componentDidMount(){
        await axios.get('/catalogue')
        .then((resp) => {
            this.setState({ comments: resp.data })
        })
        .catch((err) => console.error(err));
    }

    render (){
        const { currentUser } = this.props;

        return (
            <div className="margins" style={{height: '105vh'}}>
            </div>
        );
    }
}
