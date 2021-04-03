import React, { Component } from 'react';
import { Row, Button } from 'react-bootstrap';
import axios from 'axios';

import sloth_astronaut from '../../../../assets/sloth_astronaut.jpg';
import elon from '../../../../assets/elon.jpg';
import sloth_gif from '../../../../assets/so_tired.gif';
import patrick_wip from '../../../../assets/patrick_wip.gif';


export class Home extends Component {
    state = {
        loading: false
    }
    makeFriends = async () => {
        await axios.get('/friendship/give-friends', {
            params: {
                currentUserId: this.props.currentUser.id
            }
        })
        .catch((err) => console.error(err));
    }

    render (){
        const { currentUser } = this.props;
        let makeFriendsBtn = null;
        
        if (currentUser){
            makeFriendsBtn = (
                <div>
                    Click here to get started with some friends: {"  "}
                    <Button onClick={(e)=>this.makeFriends()}>
                        Make Friends!
                    </Button>
                </div>
            )
        }

        return (
            <div className="margins" style={{height: '105vh'}}>
                <h1>Welcome to Astronaut Sloth</h1>
                <br/>
                <p>
                    This is a small project built with React and ASP.NET Core MVC (and WebApi). Mostly everything including the simple user account/login system and basic web security is hand-implemented.
                </p>
                <br/>
                <p>
                    This site is still pretty rudimentary at the moment but the site will be getting fleshed out and polished.
                </p>
                <br/>
                <p>
                    For now you can sign up (with a fake email), log in, and make some friends!
                </p>
                {makeFriendsBtn}
                <br/>
                <Row className='row'>
                    <img src={sloth_astronaut} alt="Sloth Astronaut" width={300}/>
                </Row>
                <br/>
                <br/>
                <Row className='row'>
                    <img src={sloth_gif} alt="Sloth Gif" width={500}/>
                </Row>
                <Row className='row' style={{marginTop: '35vh'}}>
                    <img src={elon} alt="Elon Musk" width={300}/>
                </Row>
            </div>
        );
    }
}