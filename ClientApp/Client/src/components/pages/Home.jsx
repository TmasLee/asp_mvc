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
                This is a small project I've spent my plentiful spare time during the last months working on to familiarize myself with C#
                and the .NET framework. Nearly everything was hand built using React and a customized backend combining ASP.NET Core MVC and WebApi
                to serve this SPA.
            </p>
            <p>
                While using .NET template projects and other .NET and JS libraries would've been practical, I figured I'd get a better learning experience
                trying my hand at "rebuilding the wheel(s)" from scratch. I also wanted to create this project without conforming to use all of Microsofts
                web development tools (like Razor and Blazor 🤮).
            </p>
            <p>
                For this site I wanted to implement features that I hadn't worked with before or directly implemented myself. These include 
                a (rudimentary) user system with basic security tokens/cookies (JWTs and CSRF cookie) as well as sending and processing real time
                requests via sockets (more specifically the Websocket API).
            </p>
            <p>
                You can check out the source code here: <a href="https://github.com/TmasLee/asp_mvc">https://github.com/TmasLee/asp_mvc</a>
            </p>
            <p>
                <i>**DISCLAIMER: This is still a WIP and there is some clean up to be done </i>😅.
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