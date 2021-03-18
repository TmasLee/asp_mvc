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
                    Sup it's me, it's your boy Thomas.
                </p>
                <p>
                    This is a small project built with React and ASP.NET Core MVC that I've been working on in my spare time to learn .NET.
                </p>
                <p>
                    While it would've been practical to use .NET template projects or other .NET and JS libraries, I figured I'd get a better learning
                    experience making everything (mostly) from scratch. I also wanted to create this project without conforming to use all of Microsofts web
                    development tools (like Razor and Blazor 🤮).
                </p>
                <p>
                    I wasn't sure what I wanted to make for this site so I added features as I went. I ended up trying to implement features that I either hadn't worked
                    with before or hadn't implemented myself with a focus on learning C# and .NET. Some of these features include handling real time
                    requests using sockets (via SignalR and the WebSocket API) and a user login system with some web security (JWTs and CSRF cookies). Another
                    focus for this project was experimenting with the implementation of some of these features and how different application states would be managed
                    on both the front and back end.
                </p>
                <p>
                    You can check out the source code here: <a href="https://github.com/TmasLee/asp_mvc">https://github.com/TmasLee/asp_mvc</a>
                </p>
                <br/>
                {makeFriendsBtn}
                <br/><br/>
                <p style={{fontSize: '14px'}}>
                    <i>**Note: The site isn't fully fleshed out and is a WIP. There is also some polishing and optimization to be done.</i> 😅.
                </p>
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