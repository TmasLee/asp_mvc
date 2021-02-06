import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import '../../../../css/UserPage.css';
import sloth from '../../../../assets/handsome_sloth.png';

class User extends Component {
    state = {
        user: null
    }

    componentDidMount(){
        axios.get(`/user/get-user?userId=${this.props.match.params.id}`)
        .then((resp) => {
            this.setState({
                user: resp.data
            });
        })
        .catch((err) => console.error(err));
    }

    render(){
        const { user } = this.state;

        if (user){
            return(
                <Container className='flex-container'>
                    <Row className='row'>
                        <img src={sloth} alt="Handsome Sloth" width={300}/>
                    </Row>
                    <Row className='row'>
                        {user.email}
                        <br/>
                        {user.firstName} {user.lastName}
                    </Row>
                </Container>
            )
        } else {
            return null;
        }
    }
}

export default withRouter(User);