import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import sloth_astronaut from '../../../../assets/sloth_astronaut.jpg';
import elon from '../../../../assets/elon.jpg';

export class Home extends Component {
    render () {
        return (
            <div>
                <h1>Welcome to SlothBook</h1>
                <br/>
                <img/>
                <p>Welcome to SlothBook. This is a small project that implements user management and web security by hand for some C# and ASP.NET Core practice.</p>
                <p>
                    This was built with a ReactJS front end and a customized back end combining ASP.NET Core MVC and WebApi. While using .NET template projects is practical, I figured I'd get a better learning experience by starting (mostly) from scratch.
                    Also, some custom configurations (like not using Razor Pages 🤮) are a bit easier to set this way.
                </p>
                <p>You can check out the source code here: <a href="https://github.com/TmasLee/asp_mvc">https://github.com/TmasLee/asp_mvc</a></p>
                <p><i>**DISCLAIMER: This is still a WIP. There are a number of things that can be done in a smarter/cleaner way and a few things I'm still figuring out how to do with ASP.NET </i>😅. Not to worry, I'm figuring it all out 💪.</p>
                <br/>
                <Row className='row'>
                    <img src={sloth_astronaut} alt="Sloth Astronaut" width={300}/>
                </Row>
                <br/><br/><br/>
                <Row className='row'>
                    <img src={elon} alt="Elon Musk" width={300}/>
                </Row>
            </div>
        );
    }
}
