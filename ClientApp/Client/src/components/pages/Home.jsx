import React, { Component } from 'react';
import { Row, Button } from 'react-bootstrap';
import axios from 'axios';

import sloth_astronaut from '../../../../assets/sloth_astronaut.jpg';
import elon from '../../../../assets/elon.jpg';
import sloth_gif from '../../../../assets/so_tired.gif';

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
                    Welcome friend.
                </p>
                <p>
                    This is a small project I've been working on during my plentiful spare time to familiarize myself with C# and .NET. Nearly everything
                    was hand built using React and a customized backend combining ASP.NET Core MVC and WebApi to serve this SPA.
                </p>
                <p>
                    While using .NET template projects and other .NET and JS libraries would've been practical, I figured I'd get a better learning
                    experience trying my hand at "rebuilding the wheel(s)" from scratch. I also wanted to create this project without conforming to use
                    all of Microsofts web development tools (like Razor and Blazor 🤮).
                </p>
                <p>
                    When I began this project I wasn't sure what I wanted this site to be so I ended up implementing features as I went. I ended up trying to
                    implement features that I either hadn't worked with before or hadn't directly implemented myself with a focus on learning .NET. These
                    features include a user login system with basic security (JWTs and a CSRF cookie) as well as sending and processing real time requests via
                    the WebSocket API. Another focus for this project was experimenting with how I'd go about implementing these sytems and managing the
                    different application states on the front and back end.
                </p>
                {makeFriendsBtn}
                <br/>
                <p>
                    You can check out the source code here: <a href="https://github.com/TmasLee/asp_mvc">https://github.com/TmasLee/asp_mvc</a>
                </p>
                <p>
                    <i>**Note: This is still a WIP and there is some clean up to be done </i>😅.
                </p>
                <br/><br/>
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