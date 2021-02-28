import React from 'react';
import { Row } from 'react-bootstrap';
import sloth_astronaut from '../../../../assets/sloth_astronaut.jpg';
import elon from '../../../../assets/elon.jpg';
import sloth_gif from '../../../../assets/so_tired.gif';

export function Home(){
    return (
        <div className="margins" style={{height: '105vh'}}>
            <h1>Welcome to Astronaut Sloth</h1>
            <br/>
            <p>
                Welcome friend.
            </p>
            <p>
                This is a small project built with React and a customized backend combining ASP.NET Core MVC and WebApi that implements hand-coded
                user management and web security for some C# and .NET practice.
            </p>
            <p>
                While using .NET template projects and other libraries would've been practical, I figured I'd get a better learning experience
                trying my hand at "rebuilding the wheel" from scratch (mostly). Also, some custom configurations (like ripping out Razor Pages 🤮)
                are a bit easier to set up this way.
            </p>
            <p>
                You can check out the source code here: <a href="https://github.com/TmasLee/asp_mvc">https://github.com/TmasLee/asp_mvc</a>
            </p>
            <p>
                <i>**DISCLAIMER: This is still a WIP. There are a few things that can be done in a cleaner way with ASP.NET </i>😅.
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