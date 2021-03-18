import React, { Component } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import FriendListModal from '../modals/FriendListModal';
import ListModal from '../generics';
import '../../../../css/UserPage.css';
import sloth from '../../../../assets/handsome_sloth.png';
import patrick_wip from '../../../../assets/patrick_wip.gif';

class User extends Component {
    state = {
        user: null,
        toggleModal: false
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
                        <br/><br/>
                    </Row>
                    <Row className='row'>
                        <img src={patrick_wip} alt="WIP" width={400}/>
                    </Row>
                    {/* <Button>Friends</Button> */}
                </Container>
            )
        } else {
            return null;
        }
    }
}

export default withRouter(User);