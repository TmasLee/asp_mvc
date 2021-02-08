import React from 'react';
import { Row } from 'react-bootstrap';
import sloth_astronaut from '../../../../assets/sloth_astronaut.jpg';
import elon from '../../../../assets/elon.jpg';
import sloth_gif from '../../../../assets/so_tired.gif';

export function Home(){
    return (
        <div style={{height: '105vh'}}>
            <h1>Welcome to SlothBook</h1>
            <br/>
            <img/>
            <p>Hey friend.</p>
            <p>This is a small experimental project built with React and a customized backend combining ASP.NET Core MVC and WebApi that implements hand-coded user management and web security for some C# and ASP.NET Core practice.</p>
            <p>
                While using .NET template projects and other libraries is practical, I figured I'd get a better learning experience by trying my hand at "rebuilding the wheel" (mostly) from scratch.
                Also, some custom configurations (like ripping out Razor Pages 🤮) are a bit easier to set up this way.
            </p>
            <p>You can check out the source code here: <a href="https://github.com/TmasLee/asp_mvc">https://github.com/TmasLee/asp_mvc</a></p>
            <p><i>**DISCLAIMER: This is still a WIP. There are a number of things that can be done in a smarter/cleaner way and a few things I'm still figuring out how to do with ASP.NET </i>😅. 
                Don't worry, I'm figuring it all out 💪.</p>
            <br/><br/>
            {/* <Row className='row'>
                <img src={sloth_astronaut} alt="Sloth Astronaut" width={300}/>
            </Row>
            <br/> */}
            <br/>
            <Row className='row'>
                <img src={sloth_gif} alt="Sloth Gif" width={500}/>
            </Row>
            <Row className='row' style={{marginTop: '40vh'}}>
                <img src={elon} alt="Elon Musk" width={300}/>
            </Row>
        </div>
    );
}