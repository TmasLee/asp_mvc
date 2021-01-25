import React, { Component } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { getCsrfToken } from '../../utilities/utils';

class User extends Component {
    state = {

    }

    componentDidMount(){
        let config = {
            headers: {
                'csrf-token': getCsrfToken()
            }
        }
        axios.get(
            `/user/get-user?userId=${this.props.match.params.id}`,
            config
        )
        .then((resp) => {

        })
        .catch((err) => {
            console.log(err);
        })
    }

    render(){
        console.log(this.props)
        return(
            <div>
                <img alt="Sloth image"/>
                <br/>
                Email
                <br/>
                First Name
                <br/>
                Last Name
            </div>
        )
    }
}

export default withRouter(User);